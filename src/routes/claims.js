import express from "express";
import { Claim } from "../models/Claims.js";
import { Client } from "../models/Client.js";
import { authenticate } from "../middleware/authMiddleware.js"; // Admin
import { authenticateClient } from "../middleware/clientMiddleware.js"; // Client

const router = express.Router();

// Client: submit claim (must be logged in)
router.post("/", authenticateClient, async (req, res) => {
  try {
    const claim = await Claim.create({ ...req.body, clientId: req.clientId });
    res.json(claim);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: view all claims
router.get("/", authenticate, async (req, res) => {
  const claims = await Claim.findAll({ include: [Client] });
  res.json(claims);
});

export default router;
