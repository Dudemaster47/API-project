'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Jim',
        lastName: 'Billions',
        hashedPassword: bcrypt.hashSync('password'),
        previewImage: 'https://image.shutterstock.com/z/stock-photo-cartoon-butt-drawing-with-fart-cloud-funny-hand-drawn-doodle-of-gas-and-flatulence-simple-clip-1762958210.jpg'
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Hanketta',
        lastName: 'Mossley',
        hashedPassword: bcrypt.hashSync('password2'),
        previewImage: 'https://images.emojiterra.com/google/noto-emoji/v2.034/share/1f525.jpg'
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'Khalid',
        lastName: 'Abdul',
        hashedPassword: bcrypt.hashSync('password3'),
        previewImage: 'https://i.pinimg.com/originals/32/a2/24/32a224fdab2faafdb28d9eaf23685944.jpg'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
