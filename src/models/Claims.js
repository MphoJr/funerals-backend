import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Client from "./Client.js";

export const Claim = sequelize.define("Claim", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  details: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "pending" },
});

// Associations
Client.hasMany(Claim, { foreignKey: "clientId" });
Claim.belongsTo(Client, { foreignKey: "clientId" });
