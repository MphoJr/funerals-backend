import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

// Register admin
// Register admin
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });
    res.json({ success: true, admin });
  } catch (err) {
    console.error("Admin register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login admin
// Login admin
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin.id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.json({ success: true, token });
  } catch (err) {
    // 👇 Add this line
    console.error("Admin login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
