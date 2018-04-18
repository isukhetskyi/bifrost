using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Bifrost.API.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bifrost.API.Controllers
{
    public class ErrorLoggerController : Controller
    {
        public IActionResult LogError(string error)
        {
            // TODO add error logging logic here IS
            throw new NotImplementedException();
        } 
    }
}
