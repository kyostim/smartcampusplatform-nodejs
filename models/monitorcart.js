const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Monitorcart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Monitorcart;
