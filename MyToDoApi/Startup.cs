using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using MyToDoApi.Entities;
using MyToDoApi.Helpers;
using MyToDoApi.Models;
using System;
using System.Net;
using System.Text;

namespace MyToDoApi
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        private const string SecretKey = "iNivDmHLpUA223sqsfhqGbMRdRj1PVkH"; // todo: get this from somewhere secure
        private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IJwtFactory, JwtFactory>();

            services.AddAutoMapper(typeof(Startup));
            services.AddControllers();
            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    //builder.WithOrigins("http://example.com",
                    //                    "http://www.contoso.com",
                    //                    "http://localhost:4200");
                    builder.AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader();
                   // builder
                });
            });
            services.AddDbContext<TodoContext>(options => options.UseSqlServer(Configuration.GetConnectionString("TodoApiContext")));


            //JWT authorization
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ///

            //Saving parameters from configuration file to JWTIssuerOptions class
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JWTIssuerOptions));

            services.Configure<JWTIssuerOptions>(options =>
            {
                options.Issuer = jwtAppSettingOptions[nameof(JWTIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JWTIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
            });

            //generating validation token parameters that will have each token
            var validationTokenParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidIssuer = jwtAppSettingOptions[nameof(JWTIssuerOptions.Issuer)],

                ValidateAudience = true,
                ValidAudience = jwtAppSettingOptions[nameof(JWTIssuerOptions.Audience)],

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _signingKey,

                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
           
            //adding jwt authentication to middleware. Setting token validationParameters

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                    .AddJwtBearer(options =>
                {
                    options.ClaimsIssuer = jwtAppSettingOptions[nameof(JWTIssuerOptions.Issuer)];
                    options.TokenValidationParameters = validationTokenParameters;
                    options.SaveToken = true;
                }
            );

            //setting what roles can access to policy. Controller or action must be marked this this policy name 
            //(i.e. [Authorize(Policy = "ApiUser")] for AddPolicy("ApiUser",callback(policy)), 
            //where "policy" parameter allow to require claim where must be specified claim "Role", for example, 
            //and it should have someking of role that will be allowed marked controller or action).
            // api user claim policy
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiUser", policy => policy.RequireClaim(Constants.Strings.JwtClaimIdentifiers.Rol, Constants.Strings.JwtClaims.ApiAccess));
            });
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            //middleware for identity
            var builder = services.AddIdentityCore<AppUser>(o =>
            {
                // configure identity options
                o.Password.RequireDigit = false;
                o.Password.RequireLowercase = false;
                o.Password.RequireUppercase = false;
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequiredLength = 6;
            });
            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), builder.Services);
            builder.AddEntityFrameworkStores<TodoContext>().AddDefaultTokenProviders();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseExceptionHandler(
            builder =>
        {
            builder.Run(
                        async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        context.Response.Headers.Add("Access-Control-Allow-Origin", "*");

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null)
                        {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message).ConfigureAwait(false);
                        }
                    });
        });

            //         app.UseHttpsRedirection();
            app.UseCors(MyAllowSpecificOrigins);
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            
            


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
