document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const indicator = document.querySelector(".tab-indicator");
    const tabsContainer = document.querySelector(".tabs");

    // Gán vị trí indicator ban đầu
    const activeTab = document.querySelector(".tab.active");
    if (activeTab && indicator) {
        moveIndicator(activeTab);
    }

    tabs.forEach(tab => {
        tab.addEventListener("mouseenter", () => moveIndicator(tab));
        tab.addEventListener("mouseleave", () => moveIndicator(document.querySelector(".tab.active")));
    });

    function moveIndicator(tab) {
        const rect = tab.getBoundingClientRect();
        const parentRect = tab.parentNode.getBoundingClientRect();

        indicator.style.width = rect.width + "px";
        indicator.style.left = rect.left - parentRect.left + "px";
    }
});

document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorDiv = document.getElementById("error-message");
    errorDiv.style.display = "none";

    try {
        const response = await fetch("https://localhost:7063/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                fullName: fullname,
                password: password
            })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            const errorMsg =
                result.message ||
                (result.errors && Object.values(result.errors).flat().join(", ")) ||
                "Login failed. Please check your credentials.";
            errorDiv.textContent = errorMsg;
            errorDiv.style.display = "block";
            return;
        }

        await new Promise((resolve) => {
            localStorage.setItem("user", JSON.stringify(result.data));
            requestAnimationFrame(resolve);
        });

        window.location.replace("/Home");
    } catch (error) {
        errorDiv.textContent = "Unable to connect to server.";
        errorDiv.style.display = "block";
    }
});

document.querySelector('.social-btn[title="Login with Google"]').addEventListener('click', function() {
    const currentUrl = window.location.origin + '/Home';
    const loginGoogleUrl = `https://localhost:7063/api/auth/login-google?returnUrl=${encodeURIComponent(currentUrl)}`;
    window.location.href = loginGoogleUrl;
});

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const errorDiv = document.getElementById("error-message");

    if (password !== confirmPassword) {
        errorDiv.textContent = "Passwords do not match.";
        errorDiv.style.display = "block";
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
            errorDiv.textContent = result.message || "Registration failed.";
            errorDiv.style.display = "block";
            return;
        }

        alert("Registration successful! Please verify your email and log in.");
        window.location.href = "/";
    } catch {
        errorDiv.textContent = "Unable to connect to server.";
        errorDiv.style.display = "block";
    }
});