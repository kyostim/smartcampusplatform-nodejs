const Sequelize = require('sequelize');

const sequelize = new Sequelize('smart-campus', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
