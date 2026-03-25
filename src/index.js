import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./db.js";

import authRoutes from "./routes/auth.js";
import clientRoutes from "./routes/clients.js";
import quoteRoutes from "./routes/quotes.js";
import claimRoutes from "./routes/claims.js";
import contactRoutes from "./routes/contacts.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/clients", clientRoutes);
app.use("/quotes", quoteRoutes);
app.use("/claims", claimRoutes);
app.use("/contacts", contactRoutes);

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
