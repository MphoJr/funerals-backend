import express from "express";
import { Quote } from "../models/Quote.js";
import { Client } from "../models/Client.js";
import { authenticate } from "../middleware/authMiddleware.js"; // Admin
import { authenticateClient } from "../middleware/clientMiddleware.js"; // Client

const router = express.Router();

// Public: anyone can create a quote
router.post("/", async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected: only Admins can view all quotes
router.get("/", authenticate, async (req, res) => {
  try {
    const quotes = await Quote.findAll({ include: [Client] });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
