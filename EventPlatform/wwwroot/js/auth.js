// Ghi đè toàn bộ file auth.js của bạn bằng code này

document.addEventListener("DOMContentLoaded", () => {
    // --- Biến hằng số (DOM Elements) ---
    // Lấy tất cả element cần dùng 1 lần ở đầu
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const resendForm = document.getElementById("resendForm");

    const googleBtn = document.querySelector('.social-btn[title="Login with Google"]');

    // Modal elements
    const resendModal = document.getElementById("resendModal");
    const closeBtn = document.querySelector(".modal .close-btn"); // Lấy nút close trong modal
    const modalEmailInput = document.getElementById("modalEmail");

    // Div hiển thị thông báo
    const mainErrorDiv = document.getElementById("error-message");
    const modalMessageDiv = document.getElementById("modal-message");

    // Tab elements
    const tabs = document.querySelectorAll(".tab");
    const indicator = document.querySelector(".tab-indicator");

    // --- Hàm trợ giúp (Helper Functions) ---

    /**
     * Hiển thị thông báo (lỗi hoặc thành công)
     * @param {HTMLElement} div - Element div để hiển thị
     * @param {string} message - Nội dung thông báo
     * @param {string} type - 'error' (mặc định) hoặc 'success'
     */
    function showMessage(div, message, type = 'error') {
        if (!div) return;
        div.textContent = message;
        div.className = `alert ${type}`; // Thêm class 'error' hoặc 'success'
        div.style.display = 'block';
    }

    /**
     * Ẩn thông báo
     * @param {HTMLElement} div - Element div đang hiển thị
     */
    function hideMessage(div) {
        if (!div) return;
        div.style.display = 'none';
        div.textContent = '';
        div.className = 'alert';
    }

    /**
     * Lấy text lỗi từ kết quả API
     * @param {object} result - Đối tượng JSON từ API
     * @param {string} defaultMessage - Thông báo mặc định
     */
    function getApiErrorMessage(result, defaultMessage) {
        return (result.errors && Object.values(result.errors).flat().join(", ")) ||
            result.message ||
            defaultMessage;
    }


    // --- Logic cho Tab Indicator ---
    function moveIndicator(tab) {
        if (!tab || !indicator) return;
        const rect = tab.getBoundingClientRect();
        const parentRect = tab.parentNode.getBoundingClientRect();
        indicator.style.width = rect.width + "px";
        indicator.style.left = rect.left - parentRect.left + "px";
    }

    const activeTab = document.querySelector(".tab.active");
    if (activeTab) {
        moveIndicator(activeTab);
    }

    tabs.forEach(tab => {
        tab.addEventListener("mouseenter", () => moveIndicator(tab));
        tab.addEventListener("mouseleave", () => moveIndicator(document.querySelector(".tab.active")));
    });


    // --- Logic cho Modal (Mở/Đóng) ---
    if (resendModal) {
        // Đóng modal khi nhấn nút (X)
        if (closeBtn) {
            closeBtn.onclick = () => resendModal.style.display = "none";
        }
        // Đóng modal khi nhấn ra ngoài
        window.onclick = (event) => {
            if (event.target == resendModal) {
                resendModal.style.display = "none";
            }
        };
    }

    // --- Xử lý sự kiện Submit Form ---

    /**
     * Xử lý Login
     */
    async function handleLogin(e) {
        e.preventDefault();
        hideMessage(mainErrorDiv);

        const fullname = document.getElementById("fullname").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const response = await fetch("https://localhost:7063/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ fullName: fullname, password: password })
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                const errorMsg = getApiErrorMessage(result, "Login failed. Please check your credentials.");

                // KIỂM TRA LỖI VÀ MỞ MODAL
                if (errorMsg.toLowerCase().includes("email is not confirmed")) {
                    // Tự điền email nếu người dùng nhập email vào ô fullname
                    modalEmailInput.value = fullname.includes('@') ? fullname : '';
                    resendModal.style.display = 'block';
                    hideMessage(modalMessageDiv); // Xóa thông báo cũ trong modal
                } else {
                    showMessage(mainErrorDiv, errorMsg, 'error');
                }
                return;
            }

            // Login thành công
            localStorage.setItem("user", JSON.stringify(result.data));
            window.location.replace("/HomePage/HomePage");

        } catch (error) {
            showMessage(mainErrorDiv, "Unable to connect to server.", 'error');
        }
    }

    /**
     * Xử lý Register
     */
    async function handleRegister(e) {
        e.preventDefault();
        hideMessage(mainErrorDiv);

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (password !== confirmPassword) {
            showMessage(mainErrorDiv, "Passwords do not match.", 'error');
            return;
        }

        try {
            const res = await fetch("https://localhost:7063/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, email, password })
            });

            const result = await res.json();

            if (!res.ok || !result.success) {
                const errorMsg = getApiErrorMessage(result, "Registration failed.");
                showMessage(mainErrorDiv, errorMsg, 'error');
                return;
            }

            // Đăng ký thành công
            alert("Registration successful! Please verify your email and log in.");
            window.location.href = "/Auth/Login"; // Thường sẽ chuyển về trang Login

        } catch (error) {
            showMessage(mainErrorDiv, "Unable to connect to server.", 'error');
        }
    }

    /**
     * Xử lý Resend Confirmation Email (trong Modal)
     */
    async function handleResend(e) {
        e.preventDefault();
        hideMessage(modalMessageDiv);
        const email = modalEmailInput.value.trim();

        if (!email) {
            showMessage(modalMessageDiv, "Please enter your email.", 'error');
            return;
        }

        const resendUrl = `https://localhost:7063/api/auth/resend-confirmation?email=${encodeURIComponent(email)}`;

        try {
            showMessage(modalMessageDiv, "Sending...", 'info'); // 'info' là class tạm, bạn có thể style nó

            const response = await fetch(resendUrl, {
                method: "POST",
                headers: { "accept": "*/*" }
            });

            if (response.ok) {
                showMessage(modalMessageDiv, "Confirmation link sent! Please check your inbox.", 'success');
            } else {
                const errorResult = await response.json();
                const errorMsg = getApiErrorMessage(errorResult, "Failed to send link.");
                showMessage(modalMessageDiv, errorMsg, 'error');
            }
        } catch (error) {
            showMessage(modalMessageDiv, "Unable to connect to server.", 'error');
        }
    }

    /**
     * Xử lý Google Login
     */
    function handleGoogleLogin() {
        const currentUrl = window.location.origin + '/HomePage/HomePage';
        const loginGoogleUrl = `https://localhost:7063/api/auth/login-google?returnUrl=${encodeURIComponent(currentUrl)}`;
        window.location.href = loginGoogleUrl;
    }


    // --- Gán Event Listeners ---
    // Kiểm tra form có tồn tại không rồi mới gán,
    // để tránh lỗi khi ở trang register mà không có loginForm

    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener("submit", handleRegister);
    }

    if (resendForm) {
        resendForm.addEventListener("submit", handleResend);
    }

    if (googleBtn) {
        googleBtn.addEventListener("click", handleGoogleLogin);
    }

});