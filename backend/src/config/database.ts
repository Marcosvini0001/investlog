import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.MYSQL_URL as string, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

export default sequelize;