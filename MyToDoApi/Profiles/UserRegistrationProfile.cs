using AutoMapper;
using MyToDoApi.Entities;
using MyToDoApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyToDoApi.Profiles
{
    public class UserRegistrationProfile : Profile
    {
        public UserRegistrationProfile()
        {
            CreateMap<RegistrationViewModel, AppUser>();
        }
    }
}
