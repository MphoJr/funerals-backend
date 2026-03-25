import express from "express";
import { Member } from "../models/Member.js";
import { Client } from "../models/Client.js";

const router = express.Router();

// Create member linked to a client
router.post("/", async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all members
router.get("/", async (req, res) => {
  const members = await Member.findAll({ include: [Client] });
  res.json(members);
});

// Get members for a specific client
router.get("/client/:clientId", async (req, res) => {
  const { clientId } = req.params;
  const members = await Member.findAll({
    where: { clientId },
    include: [Client],
  });
  res.json(members);
});

export default router;
