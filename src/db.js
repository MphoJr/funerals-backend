import { Sequelize } from "sequelize";

// Fallback: use DATABASE_URL from .env if available, otherwise use hardcoded string
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:Mphojr%40123@localhost:5432/VRO-Funerals?schema=public";

export const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  logging: false,
});
