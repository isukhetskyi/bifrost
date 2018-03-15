using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Bifrost.Domain.Models;
using Bifrost.Services.RespondentService;
using Bifrost.Services.RespondentTechnologyService;
using Bifrost.Web.ViewModels.Respondent;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bifrost.Web.Controllers
{
    public class RespondentsController : Controller
    {
        private readonly IRespondentService respondentService;
        private readonly IRespondentTechnologyService repondentTechnologyService;
        private readonly IMapper mapper;

        public RespondentsController(IRespondentService respondentService, IRespondentTechnologyService respondentTechnologyService, IMapper mapper)
        {
            this.respondentService = respondentService;
            this.repondentTechnologyService = respondentTechnologyService;
            this.mapper = mapper;
        }

        [HttpGet]
        //[Authorize(Roles = "Admin,HRManager")]
        public ViewResult Respondents()
        {
            return View("~/Views/Home/Index.cshtml");
        }

        [HttpGet]
        //[Authorize(Roles = "Admin,HRManager")]
        public JsonResult All()
        {
            List<RespondentModel> respondents = new List<RespondentModel>();
            List<RespondentTechnologyModel> technologies = new List<RespondentTechnologyModel>();
            try
            {
                technologies = this.repondentTechnologyService.GetAll();
                respondents = this.respondentService.GetAll();
                // if(respondents.Any())
                // {
                //     for(int i = 0; i < respondents.Count(); i++)
                //     {
                //         respondents[i].RespondentsTechnologies =
                //             technologies.Where(t => t.RespondentId == respondents[i].Id).ToList();
                //     }
                // }
            }
            catch(Exception e)
            {
                //todo do some logging here
            }


            return Json(new {respondents = this.mapper.Map<List<RespondentViewModel>>(respondents)});
        }
    }
}