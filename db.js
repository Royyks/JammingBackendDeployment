const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('jamming', 'admin', '12345678', {
    host: 'database-1.ctuas04ew5ro.ap-southeast-1.rds.amazonaws.com',
    port: 3306,
    dialect: 'mysql',
  });


module.exports = sequelize;