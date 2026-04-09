import sequelize from './config/database';
import Investimento from './models/modelInvestimento';
import Venda from './models/modelVenda';
import Conta from './models/modelConta';

Investimento.hasMany(Venda, { foreignKey: 'investimento_id' });
Venda.belongsTo(Investimento, { foreignKey: 'investimento_id' });

export { sequelize, Investimento, Venda, Conta };