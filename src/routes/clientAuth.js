import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Client from "../models/Client.js";

const router = express.Router();

// Register client
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await Client.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json({ success: true, client });
  } catch (err) {
    console.error("Client register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login client
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await Client.findOne({ where: { email } });

    if (!client) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, client.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    // 👇 Include role: "client" in the JWT payload
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
