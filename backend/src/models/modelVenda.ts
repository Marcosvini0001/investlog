import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Venda extends Model {
  public id!: number;
  public quantidade!: number;
  public valor_unitario!: number;
  public valor_total!: number;
}

Venda.init(
  {
    quantidade: DataTypes.FLOAT,
    valor_unitario: DataTypes.FLOAT,
    valor_total: DataTypes.FLOAT
  },
  {
    sequelize,
    modelName: 'Venda'
  }
);

export default Venda;