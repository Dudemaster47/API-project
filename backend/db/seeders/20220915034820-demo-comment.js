'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        songId: 1,
        body: 'An absolute masterpiece that makes me hungry for more',
      },
      {
        userId: 2,
        songId: 2,
        body: 'ITS JUST SILENCE FOR FOUR MINUTES???? WTF',
      },
      {
        userId: 3,
        songId: 3,
        body: 'moo',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Comments', {
      username: { [Op.in]: ['An absolute masterpiece that makes me hungry for more',
      'ITS JUST SILENCE FOR FOUR MINUTES???? WTF',
       'moo'] }
    }, {});
  }
};
