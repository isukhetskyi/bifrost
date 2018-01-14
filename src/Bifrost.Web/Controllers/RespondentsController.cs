using Microsoft.AspNetCore.Mvc;

namespace Bifrost.Web.Controllers
{
    public class RespondentsController : Controller
    {
        [HttpGet]
        public ViewResult Respondents()
        {
            return View("~/Views/Home/Index.cshtml");
        }
    }
}