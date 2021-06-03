const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Feature = sequelize.define('feature', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  type: Sequelize.STRING
});

module.exports = Feature;
