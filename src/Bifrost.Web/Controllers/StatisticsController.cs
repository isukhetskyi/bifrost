using Microsoft.AspNetCore.Mvc;

namespace Bifrost.Web.Controllers
{
    public class StatisticsController : Controller
    {
        [HttpGet]
        public ViewResult Statistics()
        {
            return View("~/Views/Home/Index.cshtml");
        }
    }
}