import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Client } from "./Client.js";

export const Member = sequelize.define("Member", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  phone: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "member" }, // e.g. family member, beneficiary
});

// Associations
Client.hasMany(Member, { foreignKey: "clientId" });
Member.belongsTo(Client, { foreignKey: "clientId" });
