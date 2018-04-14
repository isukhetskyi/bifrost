using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using AutoMapper;
using Bifrost.Domain.Models;
using Bifrost.Services.RespondentService;
using Bifrost.Services.RespondentTechnologyService;
using Bifrost.API.ViewModels.Respondent;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bifrost.API.Controllers
{
    public class RespondentsController : Controller
    {
        private readonly IRespondentService respondentService;
        private readonly IRespondentTechnologyService repondentTechnologyService;
        private readonly IMapper mapper;

        public RespondentsController (IRespondentService respondentService, IRespondentTechnologyService respondentTechnologyService, IMapper mapper)
        {
            this.respondentService = respondentService;
            this.repondentTechnologyService = respondentTechnologyService;
            this.mapper = mapper;
        }

        // [HttpGet]
        // //[Authorize(Roles = "Admin,HRManager")]
        // public ViewResult Respondents ()
        // {
        //     return View ("~/Views/Home/Index.cshtml");
        // }

        [HttpGet]
        //[Authorize(Roles = "Admin,HRManager")]
        public IActionResult All ()
        {
            List<RespondentModel> respondents = new List<RespondentModel> ();
            List<RespondentTechnologyModel> technologies = new List<RespondentTechnologyModel> ();
            try
            {
                technologies = this.repondentTechnologyService.GetAll ();
                respondents = this.respondentService.GetAll ();
                if (respondents.Any ())
                {
                    for (int i = 0; i < respondents.Count (); i++)
                    {
                        respondents[i].RespondentsTechnologies =
                            technologies.Where (t => t.RespondentId == respondents[i].Id).ToList ();
                    }
                }
            }
            catch (Exception e)
            {
                return BadRequest();
            }

            return Ok(new { respondents = this.mapper.Map<List<RespondentsViewModel>> (respondents) });
        }

        [HttpGet]
        public IActionResult Filter (int languageId = 0, int frameworkId = 0, int databaseId = 0)
        {
            var respondents = this.mapper.Map<List<RespondentsViewModel>> (
                    this.GetFilteredList (languageId, frameworkId, databaseId));
            return Ok (new
            {
                respondents = respondents
            });
        }

        [HttpGet]
        public IActionResult Respondent (int respondentId)
        {
            var result = new RespondentModel ();
            try
            {
                result = this.respondentService.Get (respondentId);
            }
            catch (Exception e)
            {
                // TODO add logging here
                return BadRequest(e.Message);
            }

            return Ok (new { respondent = this.mapper.Map<RespondentViewModel> (result) });
        }

        [HttpGet]
        public IActionResult ExportToCsv (int languageId = 0, int frameworkId = 0, int databaseId = 0)
        {
            return Ok (new
            {
                respondents = this.mapper.Map<List<RespondentViewModel>> (
                    this.GetFilteredList (languageId, frameworkId, databaseId))
            });
        }

        private List<RespondentModel> GetFilteredList (int languageId, int frameworkId, int databaseId)
        {
            var result = new List<RespondentModel> ();

            try
            {
                result = this.respondentService.GetFiltered (languageId, frameworkId, databaseId);
            }
            catch (Exception e)
            {
                // TODO add loggin here
            }

            return result;
        }
    }
}