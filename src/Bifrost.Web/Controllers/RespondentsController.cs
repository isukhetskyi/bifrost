using System;
using System.Collections.Generic;
using AutoMapper;
using Bifrost.Domain.Models;
using Bifrost.Services.RespondentService;
using Bifrost.Web.ViewModels.Respondent;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bifrost.Web.Controllers
{
    public class RespondentsController : Controller
    {
        private readonly IRespondentService respondentService;
        private readonly IMapper mapper;

        public RespondentsController(IRespondentService respondentService, IMapper mapper)
        {
            this.respondentService = respondentService;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,HRManager")]
        public ViewResult Respondents()
        {
            return View("~/Views/Home/Index.cshtml");
        }

        [HttpGet]
        [Authorize(Roles = "Admin,HRManager")]
        public JsonResult All()
        {
            List<RespondentModel> respondents = new List<RespondentModel>();
            try
            {
                respondents = this.respondentService.GetAll();
            }
            catch(Exception e)
            {
                //todo do some logging here
            }

            return Json(new {respondents = this.mapper.Map<List<RespondentViewModel>>(respondents)});
        }
    }
}