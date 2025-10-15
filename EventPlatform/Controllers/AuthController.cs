using Microsoft.AspNetCore.Mvc;

namespace EventPlatform.Controllers;

public class AuthController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}