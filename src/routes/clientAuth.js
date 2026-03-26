import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Client } from "../models/Client.js";

const router = express.Router();

// Register new client
router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const client = await Client.create({
      name,
      email,
      phone,
      password: hashed,
    });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login client
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const client = await Client.findOne({ where: { email } });
    if (!client || !(await bcrypt.compare(password, client.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: client.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
