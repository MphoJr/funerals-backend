import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Quote from "../models/Quote.js";
import { Claims } from "../models/Claims.js";
import Contact from "../models/Contact.js";
import Client from "../models/Client.js";

const router = express.Router();

// ✅ Only admins should access these routes
function adminOnly(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
}

// Quotes
router.get("/quote", authMiddleware, adminOnly, async (req, res) => {
  const quotes = await Quote.findAll();
  res.json(quotes);
});

// Claims
router.get("/claims", authMiddleware, adminOnly, async (req, res) => {
  const claims = await Claims.findAll({ include: Client });
  res.json(claims);
});

// Contact messages
router.get("/contact", authMiddleware, adminOnly, async (req, res) => {
  const messages = await ContactMessage.findAll();
  res.json(messages);
});

// Clients list
router.get("/clients", authMiddleware, adminOnly, async (req, res) => {
  const clients = await Client.findAll();
  res.json(clients);
});

// Edit client
router.put("/clients/:id", authMiddleware, adminOnly, async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if (!client) return res.status(404).json({ error: "Client not found" });

  client.username = req.body.username || client.username;
  client.email = req.body.email || client.email;
  await client.save();

  res.json(client);
});

// Delete client
router.delete("/clients/:id", authMiddleware, adminOnly, async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if (!client) return res.status(404).json({ error: "Client not found" });

  await client.destroy();
  res.json({ success: true });
});

export default router;
