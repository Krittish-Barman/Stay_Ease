/* =========================
   Stay_Ease - main.js
   General JavaScript File
   ========================= */

/* --------- Navbar Active Link --------- */
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop();

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});

/* --------- Check Login Status --------- */
function isLoggedIn() {
    return localStorage.getItem("stayease_user") !== null;
}

/* --------- Logout Function --------- */
function logoutUser() {
    localStorage.removeItem("stayease_user");
    alert("You have been logged out successfully!");
    window.location.href = "login.html";
}

/* --------- Protect Pages (Optional) --------- */
function protectPage() {
    if (!isLoggedIn()) {
        alert("Please login first to access this page.");
        window.location.href = "login.html";
    }
}

/* --------- Show Username (If Logged In) --------- */
function showUserName() {
    const userData = localStorage.getItem("stayease_user");

    if (userData) {
        const user = JSON.parse(userData);
        const userBox = document.getElementById("user-name");

        if (userBox) {
            userBox.textContent = `Welcome, ${user.name}`;
        }
    }
}

/* --------- Run User Name Display --------- */
document.addEventListener("DOMContentLoaded", showUserName);
