import express from "express";
import dotenv from "dotenv";
import authRoutes from "./auth/auth.js";
import quoteRoutes from "./quotes/quotes.js";
import memberRoutes from "./members/members.js";
import claims from "./claims/claims.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/quotes", quoteRoutes);
app.use("/members", memberRoutes);
app.use("/claims", claimsRoutes);

app.listen(4000, () => console.log("Backend running on port 4000"));
