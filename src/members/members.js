import express from "express";
import { prisma } from "../prisma/client.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Add member
router.post("/", verifyToken, async (req, res) => {
  const { name, policyNumber } = req.body;
  const member = await prisma.member.create({ data: { name, policyNumber } });
  res.json(member);
});

// Add beneficiary (limit 13)
router.post("/:id/beneficiaries", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, relation } = req.body;

  const count = await prisma.beneficiary.count({
    where: { memberId: parseInt(id) },
  });
  if (count >= 13)
    return res.status(400).json({ error: "Max 13 beneficiaries allowed" });

  const beneficiary = await prisma.beneficiary.create({
    data: { name, relation, memberId: parseInt(id) },
  });
  res.json(beneficiary);
});

// View member + beneficiaries
router.get("/:id", verifyToken, async (req, res) => {
  const member = await prisma.member.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { beneficiaries: true },
  });
  res.json(member);
});

export default router;
