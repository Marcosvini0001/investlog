import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { User } from "./modelUsers";

export class Conta extends Model {
  public id!: number;
  public userId!: number;
  public saldo!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Conta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    saldo: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "contas",
  },
);

Conta.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasOne(Conta, { foreignKey: "userId", as: "conta" });
