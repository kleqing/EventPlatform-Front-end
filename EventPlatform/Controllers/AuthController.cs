using Microsoft.AspNetCore.Mvc;

namespace EventPlatform.Controllers;

public class AuthController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
    
    public IActionResult Register()
    {
        return View();
    }
    
    public IActionResult ForgotPassword()
    {
        return View();
    }
    
    [HttpGet]
    public IActionResult ResetPassword(string token)
    {
        ViewData["Token"] = token;
        return View();
    }
    
    [HttpGet]
    public IActionResult ConfirmEmail(string verifiedEmail)
    {
        ViewBag.Success = !string.IsNullOrEmpty(verifiedEmail);
        ViewBag.VerifiedEmail = verifiedEmail;
        return View();
    }

}