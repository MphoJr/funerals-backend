// routes/client.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { Claims } from "../models/Claims.js";
import Member from "../models/Members.js";
import Client from "../models/Client.js";

const router = express.Router();

/* -------------------- CLAIMS -------------------- */

// Get all claims for logged-in client

router.post("/client/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password); // 👀 check values

  const client = await Client.findOne({ where: { email } });
  if (!client) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, client.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: client.id, role: "client" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  res.json({ token });
});

router.get("/claims", authMiddleware, async (req, res) => {
  try {
    const claims = await Claims.findAll({ where: { clientId: req.user.id } });
    res.json(claims);
  } catch (err) {
    console.error("Error fetching claims:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Add new claim
router.post("/claims", authMiddleware, async (req, res) => {
  try {
    const claims = await Claims.create({
      description: req.body.description,
      status: "Pending",
      clientId: req.user.id,
    });
    res.json(claims);
  } catch (err) {
    console.error("Error creating claim:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* -------------------- BENEFICIARIES -------------------- */

// Get all beneficiaries for logged-in client
router.get("/members", authMiddleware, async (req, res) => {
  try {
    const beneficiaries = await Member.findAll({
      where: { clientId: req.user.id },
    });
    res.json(beneficiaries);
  } catch (err) {
    console.error("Error fetching beneficiaries:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Add beneficiary (limit 13 per client)
router.post("/members", authMiddleware, async (req, res) => {
  try {
    const count = await Member.count({ where: { clientId: req.user.id } });
    if (count >= 13) {
      return res.status(400).json({ error: "Max 13 beneficiaries allowed" });
    }

    const beneficiary = await Members.create({
      name: req.body.name,
      relation: req.body.relation,
      clientId: req.user.id,
    });
    res.json(beneficiary);
  } catch (err) {
    console.error("Error creating beneficiary:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update beneficiary
router.put("/members/:id", authMiddleware, async (req, res) => {
  try {
    const beneficiary = await Member.findOne({
      where: { id: req.params.id, clientId: req.user.id },
    });
    if (!beneficiary) return res.status(404).json({ error: "Not found" });

    beneficiary.name = req.body.name || beneficiary.name;
    beneficiary.relation = req.body.relation || beneficiary.relation;
    await beneficiary.save();

    res.json(beneficiary);
  } catch (err) {
    console.error("Error updating beneficiary:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete beneficiary
router.delete("/members/:id", authMiddleware, async (req, res) => {
  try {
    const beneficiary = await Member.findOne({
      where: { id: req.params.id, clientId: req.user.id },
    });
    if (!beneficiary) return res.status(404).json({ error: "Not found" });

    await beneficiary.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting beneficiary:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* -------------------- PROFILE -------------------- */

// Get client profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const client = await Client.findByPk(req.user.id);
    res.json(client);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update client profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const client = await Client.findByPk(req.user.id);
    if (!client) return res.status(404).json({ error: "Not found" });

    client.name = req.body.name || client.name;
    client.surname = req.body.surname || client.surname;
    client.email = req.body.email || client.email;
    await client.save();

    res.json(client);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
