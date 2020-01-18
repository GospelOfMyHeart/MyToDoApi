﻿using System.Security.Claims;
using System.Threading.Tasks;

namespace MyToDoApi.Helpers
{
    public interface IJwtFactory
    {
        ClaimsIdentity GenerateClaimsIdentity(string userName, string id);
        Task<string> GenerateEncodedToken(string userName, ClaimsIdentity identity);
    }
}