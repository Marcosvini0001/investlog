import sequelize from './config/database';
import Investimento from './models/modelInvestimento';
import Venda from './models/modelVenda';
import Conta from './models/modelConta';
import { User } from './models/modelUsers';

Investimento.hasMany(Venda, { foreignKey: 'investimento_id' });
Venda.belongsTo(Investimento, { foreignKey: 'investimento_id' });

User.hasMany(Investimento, {
  foreignKey: "userId",
  as: "investments",
});

Investimento.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});


export { sequelize, Investimento, Venda, Conta, User };