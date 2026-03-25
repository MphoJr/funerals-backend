import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Admin = sequelize.define("Admin", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});
