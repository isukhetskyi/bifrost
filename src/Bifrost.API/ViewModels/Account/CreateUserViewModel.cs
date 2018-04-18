﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Bifrost.Domain.Enums;

namespace Bifrost.API.ViewModels.Account
{
    public class CreateUserViewModel
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }

        public RolesEnum Role {get;set;}
    }
}