import { Sequelize } from "sequelize";

// Directly pass the connection string instead of process.env
export const sequelize = new Sequelize(
  "postgresql://postgres:Mphojr%40123@localhost:5432/VRO-Funerals?schema=public",
  {
    dialect: "postgres",
    logging: false,
  },
);
