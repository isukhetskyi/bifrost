using System;
using AspNet.Security.OAuth.Validation;
using Bifrost.Data.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Bifrost.Auth
{
    public class Startup
    {
        public Startup (IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services)
        {
            services.AddMvc ();

            services.AddDbContext<ApplicationDbContext> (options =>
            {
                options.UseSqlServer (Configuration.GetConnectionString ("DefaultConnection"));
                options.UseOpenIddict ();
            });

               services.AddIdentity<ApplicationUser, IdentityRole>()
           .AddEntityFrameworkStores<ApplicationDbContext>()
           .AddDefaultTokenProviders();

            services.AddOpenIddict (options =>
            {
                options.AddEntityFrameworkCoreStores<DbContext> ();
                options.AddMvcBinders ();
                // Enable the token endpoint.
                options.EnableTokenEndpoint ("/connect/token");
                // Enable the password flow.
                options.AllowPasswordFlow ();
                // During development, you can disable the HTTPS requirement. TODO uncomment on prod
                options.DisableHttpsRequirement ();
            });
            // Register the validation handler, that is used to decrypt the tokens.
            services.AddAuthentication (options =>
                {
                    options.DefaultScheme = OAuthValidationDefaults.AuthenticationScheme;
                })
                .AddOAuthValidation ();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment ())
            {
                app.UseDeveloperExceptionPage ();
            }
            app.UseAuthentication ();
            app.UseMvcWithDefaultRoute ();
        }
    }
}