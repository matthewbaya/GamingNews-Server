"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../categories.json");
    data.map((e) => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
      return e;
    });
    await queryInterface.bulkInsert("Categories", data);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  },
};
