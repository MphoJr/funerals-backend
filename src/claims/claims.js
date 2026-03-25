import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Submit claim (member)
router.post("/", async (req, res) => {
  const { memberId, description } = req.body;

  const member = await prisma.member.findUnique({ where: { id: memberId } });
  if (!member) return res.status(404).json({ error: "Member not found" });

  const claim = await prisma.claim.create({
    data: { memberId, description },
  });
  res.json(claim);
});

// Admin: view all claims
router.get("/", verifyToken, async (req, res) => {
  const claims = await prisma.claim.findMany({ include: { member: true } });
  res.json(claims);
});

// Admin: update claim status
router.put("/:id/status", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // "Approved" or "Rejected"

  const claim = await prisma.claim.update({
    where: { id: parseInt(id) },
    data: { status },
  });
  res.json(claim);
});

export default router;
