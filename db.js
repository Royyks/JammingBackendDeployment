const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('jamming', 'admin', '12345678', {
    host: '127.0.0.1',
    port: 3307,
    dialect: 'mysql',
  });


module.exports = sequelize;