import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";
import { Client } from "../models/Client.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/client/register", async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email already exists
    const existing = await Client.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create client
    const client = await Client.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    // Issue JWT
    const token = jwt.sign(
      { id: client.id, role: "client" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ token, client });
  } catch (err) {
    console.error("Client register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/client/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const client = await Client.findOne({ where: { email } });
    if (!client) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, client.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: client.id, role: "client" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ token, client });
  } catch (err) {
    console.error("Client login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
