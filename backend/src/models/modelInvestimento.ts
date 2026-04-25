import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { User } from "./modelUsers";

export class Investimento extends Model {
  public id!: number;
  public userId!: number;
  public nome!: string;
  public tipo!: string;
  public quantidade!: number;
  public valor_unitario!: number;
  public valor_total!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Investimento.init(
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
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "acao",
    },
    quantidade: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    valor_unitario: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    valor_total: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "investimentos",
  }
);

Investimento.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Investimento, { foreignKey: "userId", as: "investments" });