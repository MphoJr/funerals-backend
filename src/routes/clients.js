import express from "express";
import { Client } from "../models/Client.js";

const router = express.Router();

// Create client
router.post("/", async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all clients
router.get("/", async (req, res) => {
  const clients = await Client.findAll();
  res.json(clients);
});

export default router;
