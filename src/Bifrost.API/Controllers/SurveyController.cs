using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Bifrost.Domain.Models;
using Bifrost.Services.RespondentService;
using Bifrost.Services.TechnologyService;
using Bifrost.API.ViewModels;
using Bifrost.API.ViewModels.Survey;
using Bifrost.API.ViewModels.Technology;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bifrost.API.Controllers
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

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Survey([FromBody]SurveyViewModel body)
        {
            try
            {
                var technologies = this.technologyService.GetAll();
                var usersTechnologies = new List<TechnologyModel>();
                if(body.Technologies != null && body.Technologies.Any())
                {
                    var ids = new List<int>();
                    foreach(var id in body.Technologies)
                    {
                        var lang = technologies.FirstOrDefault(t => t.Id == id);
                        if(lang != null)
                        {
                            usersTechnologies.Add(lang);
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
                return BadRequest(e.Message);
            }

            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetTechnologies()
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
                return BadRequest(e.Message);
            }

            return Ok((new {technologies = result}));
        }
    }






}