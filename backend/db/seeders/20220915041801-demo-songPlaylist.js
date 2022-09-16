'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SongPlaylists', [
      {
        songId: 1,
        playlistId: 1,
      },
      {
        songId: 2,
        playlistId: 2,
      },
      {
        songId: 3,
        playlistId: 3,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SongPlaylists', {
      id: { [Op.in]: [1,
      2,
      3] }
    }, {});
  }
};
