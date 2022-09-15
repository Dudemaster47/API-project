'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
return queryInterface.bulkInsert('Songs', [
      {
        userId: 1,
        albumId: 1,
        title: 'The Song That Never Ends',
        description: "The Shepherd Tone, playing for 20 hours",
        url: 'fake.fakeriffic.gov',
        previewImage: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Shepard_Tones_spectrum_linear_scale.png'
      },
      {
        userId: 2,
        albumId: 2,
        title: "4'33",
        description: "John Cage's undisputed masterpiece, performed live",
        url: 'fake.fakeroni.gov',
        previewImage: 'https://i.scdn.co/image/ab67616d0000b273eea65d73bcb126fbd5995970'
      },
      {
        userId: 3,
        albumId: 3,
        title: "Cows: The Moosical Overture",
        description: "You've never heard barnyard noises quite like these",
        url: 'fake.fakerella.gov',
        previewImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Cow_female_black_white.jpg'
      }
    ], {});
  },
  

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('ongs', {
      username: { [Op.in]: ['The Song That Never Ends', "4'33", 'Cows: The Moosical Overture'] }
    }, {});
  }
};
