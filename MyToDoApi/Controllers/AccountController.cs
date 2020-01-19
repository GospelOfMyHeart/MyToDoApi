using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MyToDoApi.Entities;
using MyToDoApi.Helpers;
using MyToDoApi.Models;
using MyToDoApi.ViewModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MyToDoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AccountController:ControllerBase
    {
 
        private readonly TodoContext _appDbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IJwtFactory _jwtFactory;
        private readonly JWTIssuerOptions _jwtOptions;


        public AccountController(UserManager<AppUser> userManager, IMapper mapper, TodoContext appDbContext,
            IJwtFactory jwtFactory, IOptions<JWTIssuerOptions> jwtOptions)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
        }
        
        [HttpPost("registration")]
        async public Task<IActionResult> Post([FromBody] RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = _mapper.Map<AppUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            await _appDbContext.SaveChangesAsync();

            return new OkObjectResult("Account created");
        }
        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody]CredentialsViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var claimsIdentity = await GetClaimsIdentity(credentials.UserName, credentials.Password);
            if (claimsIdentity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
            }

            var jwt = await Tokens.GenerateJwt(claimsIdentity, _jwtFactory, credentials.UserName, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });
            return new OkObjectResult(jwt);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // get the user to verifty
            var userToVerify = await _userManager.FindByNameAsync(userName);

            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            // check the credentials
            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                //returning claims that has user role and id
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}
