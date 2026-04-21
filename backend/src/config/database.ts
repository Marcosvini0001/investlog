import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('financeiro', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

export default sequelize;