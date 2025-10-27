using Microsoft.AspNetCore.Mvc;

namespace EventPlatform.Controllers
{
    public class ProfileController : Controller
    {
        public IActionResult Profile()
        {
            return View();
        }
    }
}
