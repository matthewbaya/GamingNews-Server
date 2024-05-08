"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Articles",
      require("../articles.json").map((e) => {
        e.createdAt = new Date();
        e.updatedAt = new Date();
        return e;
      }, {})
    );
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
    await queryInterface.bulkDelete("Articles", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  },
};
