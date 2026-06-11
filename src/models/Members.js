import { DataTypes, NUMBER } from "sequelize";
import { sequelize } from "../db.js";
import Client from "./Client.js";

const Member = sequelize.define(
  "Member",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    relation: { type: DataTypes.STRING, allowNull: false },
    idNumber: { type: DataTypes.STRING, allowNull: false },
    clientId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
  },
);

export default Member; // ✅ default export

// Associations
Client.hasMany(Member, { foreignKey: "clientId" });
Member.belongsTo(Client, { foreignKey: "clientId" });
