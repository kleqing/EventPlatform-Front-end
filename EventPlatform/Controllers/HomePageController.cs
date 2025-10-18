using Microsoft.AspNetCore.Mvc;

namespace EventPlatform.Controllers
{
    public class HomePageController : Controller
    {
        public IActionResult HomePage()
        {
            return View();
        }
    }
}
