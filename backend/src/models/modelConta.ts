import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Conta extends Model {
  public id!: number;
  public descricao!: string;
  public valor!: number;
}

Conta.init(
  {
    descricao: DataTypes.STRING,
    valor: DataTypes.FLOAT
  },
  {
    sequelize,
    modelName: 'Conta'
  }
);

export default Conta;