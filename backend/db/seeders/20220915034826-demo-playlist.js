'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Playlists', [
      {
        userId: 1,
        name: 'Finest James',
        previewImage: 'https://itsnotcomplicatedrecipes.com/wp-content/uploads/2022/01/Strawberry-Jam-Feature.jpg',
      },
      {
        userId: 2,
        name: 'blueBerry bEAts',
        previewImage: 'https://www.simplyrecipes.com/thmb/I23wzrsz_Grl4X0mUO3tOdVx0Ys=/1333x1333/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__08__blueberry-jam-lead-4-e1d1328f0f2f47ed91b981481d148333.jpg',
      },
      {
        userId: 3,
        name: 'sour Smash hits',
        previewImage: 'https://www.giverecipe.com/wp-content/uploads/2013/04/homemade-lemon-jam-image-260x195.jpg',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Playlists', {
      username: { [Op.in]: ['Finest James',
      'blueBerry bEAts',
      'sour Smash hits'] }
    }, {});
  }
};
