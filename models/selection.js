const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Selection = sequelize.define('selection', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Selection;
