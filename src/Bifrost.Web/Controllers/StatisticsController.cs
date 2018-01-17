using System;
using System.Linq;
using AutoMapper;
using Bifrost.Services.RespondentService;
using Bifrost.Services.RespondentTechnologyService;
using Bifrost.Services.TechnologyService;
using Bifrost.Web.ViewModels.Statistics;
using Microsoft.AspNetCore.Mvc;

namespace Bifrost.Web.Controllers
{
    public class StatisticsController : Controller
    {
        private readonly ITechnologyService technologyService;
        private readonly IRespondentTechnologyService repondentTechnologyService;
        private readonly IMapper mapper;

        public StatisticsController(ITechnologyService technologyService,
                                    IRespondentTechnologyService respondentTechnologyService,
                                    IMapper mapper)
        {
            this.technologyService = technologyService;
            this.repondentTechnologyService = respondentTechnologyService;
            this.mapper = mapper;
        }

        [HttpGet]
        public ViewResult Statistics ()
        {
            return View ("~/Views/Home/Index.cshtml");
        }

        public JsonResult All ()
        {
            var result = new StatisticsViewModel ();
            try
            {
                var technologies = this.technologyService.GetAll ();
                var rt = this.repondentTechnologyService.GetAll();
                if (rt != null && rt.Any () && technologies != null && technologies.Any())
                {
                    foreach(var tech in technologies)
                    {
                        tech.RespondentsTechnologies = rt.Where(r => r.TechnologyId == tech.Id).ToList();
                    }

                    result.Languages = technologies.Where(t => t.TechnologyType == 1)
                                                    .Select(r =>
                                                            {
                                                                return new SimplifiedTechnologyModel
                                                                {
                                                                    Key = r.TechnologyName,
                                                                    Value = r.RespondentsTechnologies.Count()
                                                                };
                                                            })
                                                    .Where(f => f.Value > 0).OrderByDescending(t => t.Value).ToList();

                    result.Frameworks = technologies.Where(t => t.TechnologyType == 2)
                                                    .Select(r =>
                                                            {
                                                                return new SimplifiedTechnologyModel
                                                                {
                                                                    Key = r.TechnologyName,
                                                                    Value = r.RespondentsTechnologies.Count()
                                                                };
                                                            })
                                                    .Where(f => f.Value > 0).OrderByDescending(t => t.Value).ToList();
                    result.Databases = technologies.Where(t => t.TechnologyType == 3)
                                                    .Select(r =>
                                                            {
                                                                return new SimplifiedTechnologyModel
                                                                {
                                                                    Key = r.TechnologyName,
                                                                    Value = r.RespondentsTechnologies.Count()
                                                                };
                                                            })
                                                    .Where(f => f.Value > 0).OrderByDescending(t => t.Value).ToList();

                    var frameworksTotalCount = result.Frameworks.Sum(f => f.Value);
                    result.Frameworks = result.Frameworks.Select(t => { t.TotalCount = frameworksTotalCount; return t; }).ToList();
                    var databaseTotalCount = result.Databases.Sum(f => f.Value);
                    result.Databases = result.Databases.Select(t => { t.TotalCount = databaseTotalCount; return t; }).ToList();
                    var languagesTotalCount = result.Languages.Sum(f => f.Value);
                    result.Languages = result.Languages.Select(t => { t.TotalCount = languagesTotalCount; return t; }).ToList();
                }
            }
            catch(Exception e)
            {
                // todo do some logging here
            }


            return Json (new { data = result });
        }
    }
}