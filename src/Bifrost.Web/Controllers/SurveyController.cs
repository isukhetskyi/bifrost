using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Bifrost.Web.Controllers
{
    [Route("api/[controller]")]
    public class SurveyController : Controller
    {
        // todo inject repository dependency here

        [HttpGet]
        public IActionResult Survey()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Survey(object model)
        {
            return View();
        }
    }


}