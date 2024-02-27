const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  // database: "project-management",
  database: process.env.DB_NAME,
  // username: "postgres",
  username: process.env.DB_USER,
  // password: "postgres",
  password: process.env.DB_PASSWORD,
  // host: "localhost",
  host: process.env.DB_HOST,
  // port: "5432",
  port: process.env.DB_PORT,
  dialect: 'postgres',
});

module.exports = sequelize;
