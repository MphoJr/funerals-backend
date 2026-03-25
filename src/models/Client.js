import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Client = sequelize.define("Client", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  phone: { type: DataTypes.STRING },
});
