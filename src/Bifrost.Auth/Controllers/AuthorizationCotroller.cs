using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AspNet.Security.OpenIdConnect.Extensions;
using AspNet.Security.OpenIdConnect.Primitives;
using AspNet.Security.OpenIdConnect.Server;
using Bifrost.Auth.ViewModels;
using Bifrost.Data.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Bifrost.Auth.Controllers
{
    public class AuthorizationCotroller : Controller
    {

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;

        public AuthorizationCotroller (
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILogger<AuthorizationCotroller> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        [HttpPost ("~/connect/token"), Produces ("application/json")]
        public IActionResult Exchange (OpenIdConnectRequest request)
        {
            if (request.IsPasswordGrantType ())
            {
                // Validate the user credentials.
                // Note: to mitigate brute force attacks, you SHOULD strongly consider
                // applying a key derivation function like PBKDF2 to slow down
                // the password validation process. You SHOULD also consider
                // using a time-constant comparer to prevent timing attacks.
                if (request.Username != "alice@wonderland.com" ||
                    request.Password != "P@ssw0rd")
                {
                    return Forbid (OpenIdConnectServerDefaults.AuthenticationScheme);
                }
                // Create a new ClaimsIdentity holding the user identity.
                var identity = new ClaimsIdentity (
                    OpenIdConnectServerDefaults.AuthenticationScheme,
                    OpenIdConnectConstants.Claims.Name,
                    OpenIdConnectConstants.Claims.Role);
                // Add a "sub" claim containing the user identifier, and attach
                // the "access_token" destination to allow OpenIddict to store it
                // in the access token, so it can be retrieved from your controllers.
                identity.AddClaim (OpenIdConnectConstants.Claims.Subject,
                    "71346D62-9BA5-4B6D-9ECA-755574D628D8",
                    OpenIdConnectConstants.Destinations.AccessToken);
                identity.AddClaim (OpenIdConnectConstants.Claims.Name, "Alice",
                    OpenIdConnectConstants.Destinations.AccessToken);
                // ... add other claims, if necessary.
                var principal = new ClaimsPrincipal (identity);
                // Ask OpenIddict to generate a new token and return an OAuth2 token response.
                return SignIn (principal, OpenIdConnectServerDefaults.AuthenticationScheme);
            }

            throw new InvalidOperationException ("The specified grant type is not supported.");
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register (CreateUserViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync (user, model.Password);
                if (result.Succeeded)
                {
                    _logger.LogInformation ("User created a new account with password.");

                    await _signInManager.SignInAsync (user, isPersistent : false);
                    _logger.LogInformation ("User created a new account with password.");
                    return RedirectToLocal (returnUrl);
                }
                AddErrors (result);
            }

            // If we got this far, something failed, redisplay form
            return View (model);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Login (string returnUrl = null)
        {
            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync (IdentityConstants.ExternalScheme);

            ViewData["ReturnUrl"] = returnUrl;
            return View ();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login (LoginViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync (model.Email, model.Password, model.RememberMe, lockoutOnFailure : false);
                if (result.Succeeded)
                {
                    _logger.LogInformation ("User logged in.");
                    return RedirectToLocal (returnUrl);
                }
                if (result.IsLockedOut)
                {
                    _logger.LogWarning ("User account locked out.");
                    return RedirectToAction (nameof (Lockout));
                }
                else
                {
                    ModelState.AddModelError (string.Empty, "Invalid login attempt.");
                    return View (model);
                }
            }

            // If we got this far, something failed, redisplay form
            return View (model);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Lockout ()
        {
            return View ();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation("User logged out.");
            return Redirect("/home");
        }

        #region Helpers

        private void AddErrors (IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError (string.Empty, error.Description);
            }
        }

        private IActionResult RedirectToLocal (string returnUrl)
        {
            // if (Url.IsLocalUrl(returnUrl))
            // {
            //     return Redirect(returnUrl);
            // }
            // else
            // {
            //     //return RedirectToAction(nameof(HomeController.Index), "Home");
            // }

            return Redirect ("/home");
        }

        #endregion
    }
}