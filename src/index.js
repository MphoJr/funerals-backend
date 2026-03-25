import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./db.js";
import authRoutes from "./auth/auth.js";
import { sequelize } from "./db.js";
import "./models/Admin.js";
import "./models/Client.js";
import "./models/Quote.js";
import "./models/Claim.js";
import "./models/Contact.js";

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced successfully");
});
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
