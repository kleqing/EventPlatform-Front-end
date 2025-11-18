using Microsoft.AspNetCore.Mvc;

namespace EventPlatform.Controllers
{
    public class PaymentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult BookingTickets()
        {
            return View();
        }
    }

}
