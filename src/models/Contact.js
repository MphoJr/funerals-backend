import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Contact = sequelize.define("Contact", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
});
