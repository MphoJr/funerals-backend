import express from "express";
import { Quote } from "../models/Quote.js";

const router = express.Router();

// Create quote
router.post("/", async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all quotes
router.get("/", async (req, res) => {
  const quotes = await Quote.findAll({ include: ["Client"] });
  res.json(quotes);
});

export default router;
