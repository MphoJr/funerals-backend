import express from "express";
import { prisma } from "../prisma/client.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Public: submit quote
router.post("/", async (req, res) => {
  const { name, contact, message } = req.body;
  const quote = await prisma.quote.create({ data: { name, contact, message } });
  res.json(quote);
});

// Admin: view all quotes
router.get("/", verifyToken, async (req, res) => {
  const quotes = await prisma.quote.findMany();
  res.json(quotes);
});

export default router;
