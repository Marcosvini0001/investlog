import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { User } from "./modelUsers";

export class Investimento extends Model {
  public id!: number;
  public userId!: number;
  public nome!: string;
  public quantidade!: number;
  public valor_total!: number;
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
      references: {
        model: User,
        key: "id",
      },
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.DECIMAL(10, 2),
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
User.hasMany(Investimento, { foreignKey: "userId" });