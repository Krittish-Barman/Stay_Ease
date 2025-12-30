const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = "./users.json";

// Login API
app.post("/login", (req, res) => {
    const { userid, password } = req.body;

    const users = JSON.parse(fs.readFileSync(USERS_FILE));

    const user = users.find(
        u => u.userid === userid && u.password === password
    );

    if (user) {
        res.json({
            success: true,
            message: "Login successful",
            user: user.userid
        });
    } else {
        res.json({
            success: false,
            message: "Invalid User ID or Password"
        });
    }
});

app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});
