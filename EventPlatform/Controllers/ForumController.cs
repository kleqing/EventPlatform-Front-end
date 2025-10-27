using Microsoft.AspNetCore.Mvc;

namespace EventPlatform.Controllers
{
    public class ForumController : Controller
    {
        public IActionResult Forum()
        {
            return View();
        }
    }
}
