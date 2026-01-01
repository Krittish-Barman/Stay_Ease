const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// File paths
const USERS_FILE = "./users.json";
const PROPERTY_FILE = "./properties.json";

// ---------- REGISTER USER ----------
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    const users = JSON.parse(fs.readFileSync(USERS_FILE));

    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push({ name, email, password });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    res.json({ message: "Registration successful" });
});


// ---------- LOGIN USER ----------
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
});


// ---------- ADD PROPERTY ----------
app.post("/add-property", (req, res) => {
    const { title, location, price, owner } = req.body;

    if (!title || !location || !price || !owner) {
        return res.status(400).json({ message: "All fields required" });
    }

    const properties = JSON.parse(fs.readFileSync(PROPERTY_FILE));
    properties.push({ title, location, price, owner });

    fs.writeFileSync(PROPERTY_FILE, JSON.stringify(properties, null, 2));

    res.json({ message: "Property added successfully" });
});


// ---------- GET ALL PROPERTIES ----------
app.get("/properties", (req, res) => {
    const properties = JSON.parse(fs.readFileSync(PROPERTY_FILE));
    res.json(properties);
});


// ---------- START SERVER ----------
app.listen(PORT, () => {
    console.log(`✅ Backend running at http://localhost:${PORT}`);
});
