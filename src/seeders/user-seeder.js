'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      firstName: 'Admin',
      middleName: 'Admin',
      lastName: 'Admin',
      username: 'admin',
      password: '1',
      birthday: new Date(),
      city: 'Hồ Chí Minh',
      baptismDay: new Date(),
      baptismPlace: new Date(),
      phoneNumber: "0123456789",
      address: 'VN',
      gender: '1',
      roleId: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
