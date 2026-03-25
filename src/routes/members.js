import express from "express";
import { Member } from "../models/Member.js";
import { Client } from "../models/Client.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected: only Admins can add members to a client
router.post("/", authenticate, async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected: only Admins can view all members
router.get("/", authenticate, async (req, res) => {
  const members = await Member.findAll({ include: [Client] });
  res.json(members);
});

// Protected: Admin can view members for a specific client
router.get("/client/:clientId", authenticate, async (req, res) => {
  const { clientId } = req.params;
  const members = await Member.findAll({
    where: { clientId },
    include: [Client],
  });
  res.json(members);
});

export default router;
