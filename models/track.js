const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db.js');

class Track extends Model {}

Track.init(
  {
    // Model attributes are defined here
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    album: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Track', // We need to choose the model name
  },
);

module.exports = Track;