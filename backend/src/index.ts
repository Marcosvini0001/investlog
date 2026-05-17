import sequelize from './config/database';
import { Investimento } from './models/modelInvestimento';
import { Venda } from './models/modelVenda';
import { Conta } from './models/modelConta';
import { User } from './models/modelUsers';

Investimento.hasMany(Venda, { foreignKey: 'investimentoId', as: 'vendas' });
Venda.belongsTo(Investimento, { foreignKey: 'investimentoId', as: 'investimento' });

User.hasMany(Investimento, {
  foreignKey: 'userId',
  as: 'investments',
});
Investimento.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

User.hasMany(Venda, {
  foreignKey: 'userId',
  as: 'vendas',
});
Venda.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

User.hasOne(Conta, {
  foreignKey: 'userId',
  as: 'conta',
});
Conta.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export { sequelize, Investimento, Venda, Conta, User };