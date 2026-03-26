import express from "express";
import { Contact } from "../models/Contact.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit contact message
router.post("/", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all messages
router.get("/", async (req, res) => {
  const contacts = await Contact.findAll();
  res.json(contacts);
});

export default router;
