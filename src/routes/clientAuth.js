import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Client from "../models/Client.js";

const router = express.Router();

// Register client
router.post("/register", async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    // Validate input
    if (!name || !surname || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email already exists
    const existing = await Client.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create client
    const client = await Client.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign(
      { id: client.id, role: "client" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ success: true, token });
  } catch (err) {
    console.error("Client register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login client
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // Find client by email
    const client = await Client.findOne({ where: { email } });
    if (!client) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare password with stored hash
    const match = await bcrypt.compare(password, client.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: client.id, role: "client" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ success: true, token });
  } catch (err) {
    console.error("Client login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
export default router;
