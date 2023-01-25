'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
     options.tableName = 'ReviewImages';
     return queryInterface.bulkInsert(options, [
      {
        "reviewId": 1,
        "url": "https://youtube.com"
      },
      {
        "reviewId": 2,
        "url": "https://youtube.com"
      },
      {
        "reviewId": 3,
        "url": "https://youtube.com"
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
  
};
