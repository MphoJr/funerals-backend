import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

const token = jwt.sign(
  { id: admin.id, role: "admin" },
  process.env.JWT_SECRET,
  { expiresIn: "1d" },
);
// Admin login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token });
});

router.post("/client/login", async (req, res) => {
  const { email, password } = req.body;
  const client = await prisma.client.findUnique({ where: { email } });
  if (!client) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, client.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: client.id, role: "client" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.json({ token });
});

export default router;
