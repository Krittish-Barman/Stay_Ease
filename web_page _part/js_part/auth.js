// REGISTER FUNCTION
function registerUser() {
    const userid = document.getElementById("userid").value;
    const password = document.getElementById("password").value;

    if (!userid || !password) {
        alert("All fields required");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.userid === userid);
    if (exists) {
        alert("User already exists");
        return;
    }

    users.push({ userid, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "login.html";
}


// LOGIN FUNCTION
function loginUser() {
    const userid = document.getElementById("userid").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        u => u.userid === userid && u.password === password
    );

    if (user) {
        localStorage.setItem("loggedUser", userid);
        alert("Login successful!");
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password");
    }
}

// LOGOUT
function logoutUser() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}

// CHECK LOGIN
function checkLogin() {
    const user = localStorage.getItem("loggedUser");
    if (!user) {
        window.location.href = "login.html";
    }
}
