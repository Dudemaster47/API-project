'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
return queryInterface.bulkInsert('Songs', [
      {
        userId: 1,
        albumId: 1,
        title: 'Shimmer Argentum',
        description: "A Song for Silver",
        url: 'https://dudemastersongbucket.s3.amazonaws.com/Shimmer_Argentum_reverb.mp3',
        previewImage: 'https://dudemastersongbucket.s3.amazonaws.com/shimmerargentum.png'
      },
      {
        userId: 2,
        albumId: 2,
        title: "4'33",
        description: "John Cage's undisputed masterpiece, performed live",
        url: 'https://dudemastersongbucket.s3.amazonaws.com/John+Cage+-+4-33.mp3',
        previewImage: 'https://i.scdn.co/image/ab67616d0000b273eea65d73bcb126fbd5995970'
      },
      {
        userId: 3,
        albumId: 3,
        title: "Industrial Wasteland",
        description: "Evocative of the highways of northern New Jersey",
        url: 'https://dudemastersongbucket.s3.amazonaws.com/Industrial+Wasteland.mp3',
        previewImage: 'https://dudemastersongbucket.s3.amazonaws.com/BENICIACC.png'
      },
    ], {});
  },
  

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Songs', {
      title: { [Op.in]: ['Shimmer Argentum', "4'33", 'Industrial Wasteland'] }
    }, {});
  }
};
