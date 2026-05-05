import express from "express";
import { Claims } from "../models/Claims.js";
import Client from "../models/Client.js";
import { authenticate } from "../middleware/authMiddleware.js"; // Admin
import { authenticateClient } from "../middleware/clientMiddleware.js"; // Client
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Client: submit claim (must be logged in)
router.post("/", authenticateClient, async (req, res) => {
  try {
    const claim = await Claims.create({ ...req.body, clientId: req.clientId });
    res.json(claim);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: view all claims
router.get("/", authenticate, async (req, res) => {
  const claims = await Claims.findAll({ include: [Client] });
  res.json(claims);
});
router.get("/claims", authMiddleware, async (req, res) => {
  try {
    const claims = await Claim.findAll({ where: { clientId: req.user.id } });
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Beneficiaries
router.get("/members", authMiddleware, async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.findAll({
      where: { clientId: req.user.id },
    });
    res.json(beneficiaries);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const client = await Client.findByPk(req.user.id);
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
