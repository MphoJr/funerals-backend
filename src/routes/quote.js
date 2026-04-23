import express from "express";
import Quote from "../models/Quote.js";
import Client from "../models/Client.js";
import { authenticate } from "../middleware/authMiddleware.js"; // Admin
import { authenticateClient } from "../middleware/clientMiddleware.js"; // Client

const router = express.Router();

// Public: anyone can create a quote

router.post("/", async (req, res) => {
  try {
    console.log("Incoming quote:", req.body);
    const { title, name, surname, plan, cell, email, message } = req.body;

    await Quote.create({ title, name, surname, plan, cell, email, message });

    res.json({ success: true, msg: "Quote saved successfully" });
  } catch (err) {
    console.error("❌ Error saving quote:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Protected: only Admins can view all quotes
router.get("/quote", authenticate, async (req, res) => {
  try {
    const quotes = await Quote.findAll();
    res.json(quotes);
  } catch (err) {
    console.error("Error fetching quotes:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Protected: Admin can update quote status (e.g. approved/rejected)
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findByPk(id);
    if (!quote) return res.status(404).json({ error: "Quote not found" });

    await quote.update(req.body);
    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
