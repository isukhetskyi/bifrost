using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Bifrost.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Bifrost_Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index(SurveyViewModel model)
        {
            //var model = InitializeViewModel();
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

                private TechonologyViewModel InitializeViewModel()
        {
            var result = new TechonologyViewModel
            {
                Languages = new List<TechonologyModel>(),
                Frameworks = new List<TechonologyModel>(),
                Databases = new List<TechonologyModel>()
            };

            result.Languages.AddRange(new List<TechonologyModel>
            {
                new TechonologyModel{ Id = 0, TypeId = 0, Value = "C#"},
                new TechonologyModel{ Id = 1, TypeId = 0, Value = "JavaScript"},
                new TechonologyModel{ Id = 2, TypeId = 0, Value = "C++"},
                new TechonologyModel{ Id = 3, TypeId = 0, Value = "TypeScript"},
                new TechonologyModel{ Id = 4, TypeId = 0, Value = "ObjectiveC"},
            });

            result.Frameworks.AddRange(new List<TechonologyModel>
            {
                new TechonologyModel{ Id = 5, TypeId = 1, Value = "Asp.Net MVC Core"},
                new TechonologyModel{ Id = 6, TypeId = 1, Value = "AngularJS"},
                new TechonologyModel{ Id = 7, TypeId = 1, Value = "Angular 5"},
                new TechonologyModel{ Id = 8, TypeId = 1, Value = "ReactJS"},
                new TechonologyModel{ Id = 9, TypeId = 1, Value = "EntityFramework"},
            });

            result.Databases.AddRange(new List<TechonologyModel>
            {
                new TechonologyModel{ Id = 10, TypeId = 2, Value = "SQL Server"},
                new TechonologyModel{ Id = 11, TypeId = 2, Value = "MongoDB"},
                new TechonologyModel{ Id = 12, TypeId = 2, Value = "SQLite"},
                new TechonologyModel{ Id = 13, TypeId = 2, Value = "Redis"},
                new TechonologyModel{ Id = 14, TypeId = 2, Value = "Maria"},
            });
            return result;
        }
    }

        public class TechonologyModel
    {
        public int Id { get; set; }
        public int TypeId { get; set;}
        public string Value { get; set; }
    }

    public class TechonologyViewModel
    {
        public List<TechonologyModel> Languages { get; set; }
        public List<TechonologyModel> Frameworks { get; set; }
        public List<TechonologyModel> Databases { get; set; }
    }
}
