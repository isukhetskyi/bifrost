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
            this.roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            this.userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        }

        #region Roles
        [HttpGet]
        public async Task<JsonResult> RolesAsync ()
        {
            var result = new List<IdentityRole> ();
            string[] roleNames = { "Admin", "Developer", "HR", "PM", "Sales" };

            foreach (var roleName in roleNames)
            {
                IdentityResult roleResult;
                var roleExist = await this.roleManager.RoleExistsAsync (roleName);
                if (!roleExist)
                {
                    roleResult = await this.roleManager.CreateAsync (new IdentityRole (roleName));
                }
            }

            var roles = this.roleManager.Roles.ToList ();

            var poweruser = new ApplicationUser
            {

                UserName = "isukhetskyi",
                Email = "ivan.sukhetskyi@gmail.com",
            };

            string userPWD = "Pa$$w0rd";
            var _user = await this.userManager.FindByEmailAsync ("ivan.sukhetskyi@gmail.com");

            if (_user == null)
            {
                var createPowerUser = await this.userManager.CreateAsync (poweruser, userPWD);
                if (createPowerUser.Succeeded)
                {
                    //here we tie the new user to the role
                    await this.userManager.AddToRoleAsync (poweruser, "Admin");

                }
            }

            return Json (new { roles = result });
        }

        [HttpPost]
        public async Task<JsonResult> CreateRoleAsync (IdentityRoleViewModel role)
        {
            var newRole = new IdentityRole(role.RoleName);
            IdentityResult roleResult = new IdentityResult();
            var roleExist = await this.roleManager.RoleExistsAsync (newRole.Name);
            if (!roleExist)
            {
                roleResult = await this.roleManager.CreateAsync (newRole);
            }

            return Json(new {role = roleResult.Succeeded} );
        }

        #endregion

        #region Users

        public async Task<JsonResult> CreateUserAsync(CreateUserViewModel model)
        {
            var result = new IdentityResult();

            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                result = await this.userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    // todo add here asigning to the role
                }
            }

            return Json(new {user = result});
        }

        #endregion
    }
}