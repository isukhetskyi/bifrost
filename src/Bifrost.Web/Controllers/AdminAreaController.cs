using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bifrost.Data.Models;
using Bifrost.Web.ViewModels.Account;
using Bifrost.Web.ViewModels.AdminArea;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Bifrost.Web.Controllers
{

    //[Authorize ("SuperAdmin")]
    public class AdminAreaController : Controller
    {
        private readonly IServiceProvider serviceProvider;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly UserManager<ApplicationUser> userManager;

        public AdminAreaController (IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
            this.roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>> ();
            this.userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>> ();
        }

        #region Roles
        [HttpPost]
        //[Authorize (Roles = "Admin")]
        public async Task<JsonResult> CreateRoleAsync (IdentityRoleViewModel role)
        {
            var newRole = new IdentityRole (role.RoleName);
            IdentityResult roleResult = new IdentityResult ();
            var roleExist = await this.roleManager.RoleExistsAsync (newRole.Name);
            if (!roleExist)
            {
                roleResult = await this.roleManager.CreateAsync (newRole);
            }

            return Json (new { role = roleResult.Succeeded });
        }

        #endregion

        #region Users

        [HttpPost]
        //[Authorize (Roles = "Admin")]
        public async Task<JsonResult> CreateUserAsync ([FromBody] CreateUserViewModel model)
        {
            var result = new IdentityResult ();

            // string[] roleNames = { "Admin", "Developer", "HRManager", "ProjectManager", "SalesManager" };
            // foreach (var roleName in roleNames)
            // {
            //     IdentityResult roleResult;
            //     var roleExist = await this.roleManager.RoleExistsAsync (roleName);
            //     if (!roleExist)
            //     {
            //         roleResult = await this.roleManager.CreateAsync (new IdentityRole (roleName));
            //     }
            // }

            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                result = await this.userManager.CreateAsync (user, model.Password);
                if (result.Succeeded)
                {
                    await this.userManager.AddToRoleAsync (user, model.Role.ToString ());
                }
            }

            return Json (new { user = result });
        }

        #endregion
    }
}