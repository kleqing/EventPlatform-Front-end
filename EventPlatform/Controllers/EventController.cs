using Microsoft.AspNetCore.Mvc;

namespace EventPlatform.Controllers
{
    public class EventController : Controller
    {
        public IActionResult Event()
        {
            return View();
        }
        public IActionResult EventDetail()
        {
            return View();
        }
        public IActionResult CreateEvent()
        {
            return View();
        }
        public IActionResult MyEvent()
        {
            return View();
        }
    }
}
