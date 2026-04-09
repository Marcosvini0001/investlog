import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Investimento extends Model {
  public id!: number;
  public nome!: string;
  public tipo!: string;
  public quantidade!: number;
  public valor_unitario!: number;
  public valor_total!: number;
}

Investimento.init(
  {
    nome: DataTypes.STRING,
    tipo: DataTypes.STRING,
    quantidade: DataTypes.FLOAT,
    valor_unitario: DataTypes.FLOAT,
    valor_total: DataTypes.FLOAT
  },
  {
    sequelize,
    modelName: 'Investimento'
  }
);

export default Investimento;