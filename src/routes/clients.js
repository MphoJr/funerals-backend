import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { Claims } from "../models/Claims.js";
import { Member } from "../models/Members.js";
import Client from "../models/Client.js";

const router = express.Router();

// Get client claims
router.get("/claims", authMiddleware, async (req, res) => {
  const claims = await Claims.findAll({ where: { clientId: req.user.id } });
  res.json(claims);
});

// Add new claim
router.post("/claims", authMiddleware, async (req, res) => {
  const claim = await Claims.create({
    description: req.body.description,
    clientId: req.user.id,
    status: "Pending",
  });
  res.json(claim);
});

// Get members
router.get("/members", authMiddleware, async (req, res) => {
  const members = await Members.findAll({
    where: { clientId: req.user.id },
  });
  res.json(members);
});

// Add member (limit 13)
router.post("/members", authMiddleware, async (req, res) => {
  const count = await Members.count({ where: { clientId: req.user.id } });
  if (count >= 13)
    return res.status(400).json({ error: "Max 13 members allowed" });

  const member = await Members.create({
    name: req.body.name,
    relation: req.body.relation,
    clientId: req.user.id,
  });
  res.json(member);
});

// Edit member
router.put("/members/:id", authMiddleware, async (req, res) => {
  const member = await Members.findOne({
    where: { id: req.params.id, clientId: req.user.id },
  });
  if (!member) return res.status(404).json({ error: "Not found" });

  member.name = req.body.name || member.name;
  member.relation = req.body.relation || member.relation;
  await member.save();
  res.json(member);
});

// Delete member
router.delete("/members/:id", authMiddleware, async (req, res) => {
  const member = await Members.findOne({
    where: { id: req.params.id, clientId: req.user.id },
  });
  if (!member) return res.status(404).json({ error: "Not found" });

  await member.destroy();
  res.json({ success: true });
});

// Get profile
router.get("/profile", authMiddleware, async (req, res) => {
  const client = await Client.findByPk(req.user.id);
  res.json(client);
});

// Update profile
router.put("/profile", authMiddleware, async (req, res) => {
  const client = await Client.findByPk(req.user.id);
  if (!client) return res.status(404).json({ error: "Not found" });

  client.name = req.body.name || client.name;
  client.email = req.body.email || client.email;
  await client.save();
  res.json(client);
});

export default router;
