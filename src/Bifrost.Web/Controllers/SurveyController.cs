using System.Collections.Generic;
using AutoMapper;
using Bifrost.Domain;
using Bifrost.Services.RespondentService;
using Bifrost.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Bifrost.Web.Controllers
{
    public class SurveyController : Controller
    {
        // todo inject repository dependency here
        private readonly IRespondentService respondentService;
        private readonly IMapper mapper;

        public SurveyController(IRespondentService respondentService, IMapper mapper)
        {
            this.respondentService = respondentService;
            this.mapper = mapper;
        }

        [HttpGet]
        public ViewResult Survey()
        {
            return View("~/Views/Home/Index.cshtml", InitializeViewModel());
        }

        [HttpPost]
        public IActionResult Survey([FromBody]SurveyViewModel body)
        {
            var model = mapper.Map<RespondentModel>(body);
            this.respondentService.Add(model);
            return View("~/Views/Home/Index.cshtml");
        }

        public JsonResult GetTechnologies()
        {
            return Json(new {data = InitializeViewModel()});
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
                new TechonologyModel{ Id = 0, Value = "C#"},
                new TechonologyModel{ Id = 1, Value = "JavaScript"},
                new TechonologyModel{ Id = 2, Value = "C++"},
                new TechonologyModel{ Id = 3, Value = "TypeScript"},
                new TechonologyModel{ Id = 4, Value = "ObjectiveC"},
            });

            result.Frameworks.AddRange(new List<TechonologyModel>
            {
                new TechonologyModel{ Id = 5, Value = "Asp.Net MVC Core"},
                new TechonologyModel{ Id = 6, Value = "AngularJS"},
                new TechonologyModel{ Id = 7, Value = "Angular 5"},
                new TechonologyModel{ Id = 8, Value = "ReactJS"},
                new TechonologyModel{ Id = 9, Value = "EntityFramework"},
            });

            result.Databases.AddRange(new List<TechonologyModel>
            {
                new TechonologyModel{ Id = 10, Value = "SQL Server"},
                new TechonologyModel{ Id = 11, Value = "MongoDB"},
                new TechonologyModel{ Id = 12, Value = "SQLite"},
                new TechonologyModel{ Id = 13, Value = "Redis"},
                new TechonologyModel{ Id = 14, Value = "Maria"},
            });
            return result;
        }
    }

        public class TechonologyModel
    {
        public int Id { get; set; }
        public string Value { get; set; }
    }

    public class TechonologyViewModel
    {
        public List<TechonologyModel> Languages { get; set; }
        public List<TechonologyModel> Frameworks { get; set; }
        public List<TechonologyModel> Databases { get; set; }
    }




}