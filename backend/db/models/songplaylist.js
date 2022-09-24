'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SongPlaylist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SongPlaylist.init({
    songId: {type: DataTypes.INTEGER, allowNull: false},
    playlistId: {type: DataTypes.INTEGER, allowNull: false},
  }, {
    sequelize,
    modelName: 'SongPlaylist',
  });
  return SongPlaylist;
};