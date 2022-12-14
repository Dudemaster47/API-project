'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.hasMany(
        models.Comment,
        {
          foreignKey: 'songId', onDelete: 'CASCADE',  hooks: true
        }
      );
      Song.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Song.belongsToMany(models.Playlist, {
        through: models.SongPlaylist,
        foreignKey: 'songId'
      });
    }
  }
  Song.init({
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};