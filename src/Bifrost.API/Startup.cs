using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Bifrost.API.ViewModels.Respondent;
using Bifrost.API.ViewModels.Survey;
using Bifrost.Data.Models;
using Bifrost.Domain.Models;
using Bifrost.Repository;
using Bifrost.Services.RespondentService;
using Bifrost.Services.RespondentTechnologyService;
using Bifrost.Services.TechnologyService;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Bifrost.API
{
    public class Startup
    {
        public Startup (IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration
        {
            get;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services)
        {
            services.AddCors ();
            services.AddMvc ();
            services.AddDbContext<ApplicationDbContext> (options =>
                options.UseSqlServer (Configuration.GetConnectionString ("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole> ()
                .AddEntityFrameworkStores<ApplicationDbContext> ()
                .AddDefaultTokenProviders ();
            services.AddTransient<IRepository, EntityFrameworkRepository<ApplicationDbContext>> ();
            services.AddTransient<IMapper, Mapper> ();
            services.AddTransient<IRespondentService, RespondentService> ();
            services.AddTransient<ITechnologyService, TechnologyService> ();
            services.AddTransient<IRespondentTechnologyService, RespondentTechnologyService> ();
            services.ConfigureApplicationCookie (options =>
            {
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
            });
            var config = new AutoMapper.MapperConfiguration (cfg =>
            {
                // models to domain models mapping
                cfg.CreateMap<RespondentModel, Respondent> ();
                cfg.CreateMap<Respondent, RespondentModel> ();

                cfg.CreateMap<Technology, TechnologyModel> ();
                cfg.CreateMap<TechnologyModel, Technology> ();

                cfg.CreateMap<RespondentTechnology, RespondentTechnologyModel> ();
                cfg.CreateMap<RespondentTechnologyModel, RespondentTechnology> ();

                // domain models to view models mappings
                cfg.CreateMap<RespondentModel, SurveyViewModel> ();
                cfg.CreateMap<SurveyViewModel, RespondentModel> ();

                cfg.CreateMap<RespondentModel, RespondentViewModel> ();
                cfg.CreateMap<RespondentViewModel, RespondentModel> ();

                cfg.CreateMap<RespondentModel, RespondentsViewModel> ();
                cfg.CreateMap<RespondentsViewModel, RespondentModel> ();
            });

            var mapper = config.CreateMapper ();
            services.AddSingleton (mapper);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()).UseCors("http://app.bifrost.s3-website.eu-central-1.amazonaws.com");
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory> ().CreateScope ())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext> ();
                context.Database.Migrate ();
                context.Database.EnsureCreated ();
            }
            if (env.IsDevelopment ())
            {
                app.UseDeveloperExceptionPage ();
            }
            else
            {
                app.UseExceptionHandler ("/Home/Error");
            }

            app.UseAuthentication ();

            app.UseMvc (routes =>
            {
                routes.MapRoute (
                    name: "default",
                    template: "api/{controller}/{action}/{id?}",
                    defaults : new
                    {
                        controller = "Home", action = "Index"
                    });
            });
        }
    }
}