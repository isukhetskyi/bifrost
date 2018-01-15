using System.Collections.Generic;
using AutoMapper;
using Bifrost.Services.RespondentService;
using Bifrost.Web.ViewModels.Respondent;
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
        public ViewResult Respondents()
        {
            return View("~/Views/Home/Index.cshtml");
        }

        [HttpGet]
        public JsonResult All()
        {
            var respondents = this.respondentService.GetAll();

            return Json(new {data = this.mapper.Map<List<RespondentViewModel>>(respondents)});
        }
    }
}