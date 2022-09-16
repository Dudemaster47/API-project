'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Albums', [
      {
        userId: 1,
        title: 'By Hook Or By Crook',
        description: 'A concept album',
        previewImage: 'https://cdn.mos.cms.futurecdn.net/8k3DjpgmsoD7fKwk3zyBEf.jpg',
      },
      {
        userId: 2,
        title: 'The Absence',
        description: 'Just like your mom, theres nothing here...',
        previewImage: 'https://m.media-amazon.com/images/I/21IVvn7zGAL.jpg',
      },
      {
        userId: 3,
        title: 'Cows: The Moosical',
        description: 'stand back i am beginning to moorb',
        previewImage: 'https://m.media-amazon.com/images/I/61MH78CADXL._SY445_.jpg',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Albums', {
      title: { [Op.in]: ['By Hook Or By Crook',
      'The Absence',
      'Cows: The Moosical'] }
    }, {});
  }
};
