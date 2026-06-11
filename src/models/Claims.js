import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Client from "./Client.js";

export const Claims = sequelize.define("Claims", {
  claimId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  deceasedName: { type: DataTypes.STRING, allowNull: false },
  deceasedIdNumber: { type: DataTypes.STRING, allowNull: false },
  dateOfClaim: { type: DataTypes.DATEONLY, allowNull: false },
  status: {
    type: DataTypes.ENUM("pending", "approved", "declined"),
    defaultValue: "pending",
  },
  clientId: { type: DataTypes.INTEGER, allowNull: false },
});

// Associations
Client.hasMany(Claims, { foreignKey: "clientId" });
Claims.belongsTo(Client, { foreignKey: "clientId" });
