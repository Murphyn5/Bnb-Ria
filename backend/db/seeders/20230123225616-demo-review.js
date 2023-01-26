'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
     options.tableName = 'Reviews';
     return queryInterface.bulkInsert(options, [

      {
        userId: 1,
        spotId: 1,
        review: "This was an awesome spot!",
        stars: 5
      },
      {
        userId: 2,
        spotId: 1,
        review: "This was a trashy spot!",
        stars: 1
      },
      {
        userId: 3,
        spotId: 3,
        review: "HEYYY, HE KICKED ME OUT!",
        stars: 1
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }

};
