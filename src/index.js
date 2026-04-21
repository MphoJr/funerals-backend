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

import clientRoutes from "./routes/clients.js";
import quoteRoutes from "./routes/quote.js";
import claimRoutes from "./routes/claims.js";
import contactRoutes from "./routes/contacts.js";
import clientAuthRoutes from "./routes/clientAuth.js";
import adminAuthRoutes from "./routes/adminAuth.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // Force sync: drops and recreates tables
    //await sequelize.sync({ force: true });
    //console.log("✅ Models synced (tables recreated)");
    await sequelize.sync();
    console.log("✅ Models synced");

    app.use("/quote", quoteRoutes);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
})();

// Routes
app.use("/clients", clientRoutes);
app.use("/quote", quoteRoutes);
app.use("/claims", claimRoutes);
app.use("/contacts", contactRoutes);
app.use("/client/auth", clientAuthRoutes);
app.use("/admin/auth", adminAuthRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
