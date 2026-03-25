import express from "express";
import { Claim } from "../models/Claim.js";

const router = express.Router();

// Create claim
router.post("/", async (req, res) => {
  try {
    const claim = await Claim.create(req.body);
    res.json(claim);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all claims
router.get("/", async (req, res) => {
  const claims = await Claim.findAll({ include: ["Client"] });
  res.json(claims);
});

export default router;
