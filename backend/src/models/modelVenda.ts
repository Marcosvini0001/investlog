import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { User } from "./modelUsers";

export class Venda extends Model {
  public id!: number;
  public userId!: number;
  public investimentoId!: number;
  public nome!: string;
  public tipo!: string;
  public movimento!: string;
  public quantidade!: number;
  public valor_unitario!: number;
  public valor_total!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Venda.init(
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
    investimentoId: {
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
    },
    movimento: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "vendas",
  },
);

Venda.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Venda, { foreignKey: "userId", as: "vendas" });
