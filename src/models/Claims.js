import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Client from "./Client.js";

export const Claims = sequelize.define("Claims", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  details: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "pending" },
});

// Associations
Client.hasMany(Claims, { foreignKey: "clientId" });
Claims.belongsTo(Client, { foreignKey: "clientId" });
