using Microsoft.AspNetCore.Mvc;

namespace EventPlatform.Controllers
{
    [Route("admin")] 
    public class AdminController : Controller
    {
        [Route("")] 
        [Route("index")] 
        public IActionResult Index()
        {
            ViewData["Title"] = "Dashboard";
            return View();
        }

        [Route("events")] 
        public IActionResult Events()
        {
            ViewData["Title"] = "Event Management";
            return View();
        }

        [Route("users")] 
        public IActionResult Users()
        {
            ViewData["Title"] = "User Management";
            return View();
        }

        [Route("transactions")] 
        public IActionResult Transactions()
        {
            ViewData["Title"] = "Transaction History";
            return View();
        }

        [Route("speakers")]
        public IActionResult Speakers()
        {
            ViewData["Title"] = "Speaker Applications";
            return View();
        }

        [Route("categories")] 
        public IActionResult Categories()
        {
            ViewData["Title"] = "Manage Categories";
            return View();
        }
    }
}
