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
    window.location.href = "login_page.html";
}

/* --------- Protect Pages (Optional) --------- */
function protectPage() {
    if (!isLoggedIn()) {
        alert("Please login first to access this page.");
        window.location.href = "login_page.html";
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

function loginUser() {
    const userid = document.getElementById("userid").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userid, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Login Success");
            localStorage.setItem("user", data.user);
            window.location.href = "home.html";
        } else {
            alert("Invalid login");
        }
    });
}

