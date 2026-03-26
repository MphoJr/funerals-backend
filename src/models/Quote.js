import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Client } from "./Client.js";

export const Quote = sequelize.define("Quote", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  description: { type: DataTypes.TEXT, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "pending" },
});

// Associations
Client.hasMany(Quote, { foreignKey: "clientId" });
Quote.belongsTo(Client, { foreignKey: "clientId" });
