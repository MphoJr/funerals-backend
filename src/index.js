import dotenv from "dotenv";
dotenv.config(); // must be first line
import path from "path";

// Force dotenv to load from your project root
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Debug: print all environment variables Node sees
console.log("=== ENV DEBUG START ===");
console.log(process.env);
console.log("=== ENV DEBUG END ===");

import express from "express";
import { sequelize } from "./db.js";
import cors from "cors";

// Models
import "./models/Quote.js";

// Routes
import authRoutes from "./routes/auth.js";
import clientRoutes from "./routes/clients.js";
import quoteRoutes from "./routes/quote.js";
import claimRoutes from "./routes/claims.js";
import contactRoutes from "./routes/contacts.js";
import clientAuthRoutes from "./routes/clientAuth.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // Sync models (optional: use { force: true } or { alter: true } in dev)
    await sequelize.sync();
    console.log("✅ Models synced");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1); // exit if DB fails
  }
})();

// Routes
app.use("/auth", authRoutes);
app.use("/clients", clientRoutes);
app.use("/quotes", quoteRoutes);
app.use("/claims", claimRoutes);
app.use("/contacts", contactRoutes);
app.use("/client-auth", clientAuthRoutes);

// Port
const PORT = process.env.PORT || 4000;

// DB connection + server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
