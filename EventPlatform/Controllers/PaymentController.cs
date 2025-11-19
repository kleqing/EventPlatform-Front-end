using Microsoft.AspNetCore.Mvc;

namespace EventPlatform.Controllers
{
    public class PaymentController : Controller
    {
        // 1. Mở trang Chọn Vé (Hình 3)
        // URL: /Payment/BookingTickets
        public IActionResult BookingTickets()
        {
            return View();
        }

        // 2. Mở trang Thanh Toán/Điền thông tin (Hình 2)
        // URL: /Payment/Index
        public IActionResult Index()
        {
            return View();
        }

        // 3. Mở trang QR Code (Trang đích cuối cùng)
        // URL: /Payment/PayQRCode
        public IActionResult PayQRCode()
        {
            // Bạn cần tạo thêm 1 View tên là PayQRCode.cshtml nhé
            return View();
        }
    }
}