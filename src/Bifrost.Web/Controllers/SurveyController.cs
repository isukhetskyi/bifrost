using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Bifrost.Domain;
using Bifrost.Services.RespondentService;
using Bifrost.Services.TechnologyService;
using Bifrost.Web.ViewModels;
using Bifrost.Web.ViewModels.Survey;
using Bifrost.Web.ViewModels.Technology;
using Microsoft.AspNetCore.Mvc;

namespace Bifrost.Web.Controllers
{
    public class SurveyController : Controller
    {
        private readonly IRespondentService respondentService;

        private readonly ITechnologyService technologyService;
        private readonly IMapper mapper;

        public SurveyController(IRespondentService respondentService,
                                ITechnologyService technologyService,
                                IMapper mapper)
        {
            this.respondentService = respondentService;
            this.technologyService = technologyService;
            this.mapper = mapper;
        }

        [HttpGet]
        public ViewResult Survey()
        {
            return View("~/Views/Home/Index.cshtml");
        }

        [HttpPost]
        public IActionResult Survey([FromBody]SurveyViewModel body)
        {
            try
            {
                var technologies = this.technologyService.GetAll();
                var usersTechnologies = new List<TechnologyModel>();
                if(body.ProgrammingLanguages != null && body.ProgrammingLanguages.Any())
                {
                    var ids = new List<int>();
                    foreach(var id in body.ProgrammingLanguages)
                    {
                        var lang = technologies.FirstOrDefault(t => t.Id == id);
                        if(lang != null)
                        {
                            usersTechnologies.Add(lang);
                        }
                    }
                }

                if(body.Frameworks != null && body.Frameworks.Any())
                {
                    var ids = new List<int>();
                    foreach(var id in body.Frameworks)
                    {
                        var framew = technologies.FirstOrDefault(t => t.Id == id);
                        if(framew != null)
                        {
                            usersTechnologies.Add(framew);
                        }
                    }
                }

                if(body.Databases != null && body.Databases.Any())
                {
                    var ids = new List<int>();
                    foreach(var id in body.Databases)
                    {
                        var db = technologies.FirstOrDefault(t => t.Id == id);
                        if(db != null)
                        {
                            usersTechnologies.Add(db);
                        }
                    }
                }

                var respondentModel = mapper.Map<RespondentModel>(body);
                var respondentsTechnologies = new List<RespondentTechnologyModel>();

                foreach(var t in usersTechnologies)
                {
                    respondentsTechnologies.Add(new RespondentTechnologyModel
                    {
                        TechnologyId = t.Id,
                        Technology = t,
                        RespondentId = respondentModel.Id,
                        Respondent = respondentModel
                    });
                }

                respondentModel.RespondentsTechnologies = respondentsTechnologies;
                this.respondentService.Add(respondentModel);
            }
            catch(Exception e)
            {
                // todo do some logging here
            }

            return View("~/Views/Home/Index.cshtml");
        }

        [HttpGet]
        public JsonResult GetTechnologies()
        {
            var result = new TechnologyViewModel
            {
                Languages = new List<TechnologyModel>(),
                Frameworks = new List<TechnologyModel>(),
                Databases = new List<TechnologyModel>()
            };
            try
            {
                var technologies = this.technologyService.GetAll();

                if(technologies != null && technologies.Any())
                {
                    result.Languages = technologies.Where(l => l.TechnologyType == 1).ToList();
                    result.Frameworks = technologies.Where(l => l.TechnologyType == 2).ToList();
                    result.Databases = technologies.Where(l => l.TechnologyType == 3).ToList();
                }
            }
            catch(Exception e)
            {
                // todo do some logging here
            }

            return Json(new {data = result});
        }
    }






}