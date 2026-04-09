import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('financeiro', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;