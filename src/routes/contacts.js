import express from "express";
import Contact from "../models/Contact.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit contact message
router.post("/", async (req, res) => {
  try {
    console.log("Incoming contact:", req.body);
    const { name, email, message } = req.body;
    await Contact.create({ name, email, message });
    res.json({ success: true, msg: "Message saved to database" });
  } catch (err) {
    console.error("❌ Error saving contact:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all messages
router.get("/", async (req, res) => {
  const contacts = await Contact.findAll();
  res.json(contacts);
});

export default router;
