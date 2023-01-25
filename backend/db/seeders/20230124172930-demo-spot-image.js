'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
     options.tableName = 'SpotImages';
     return queryInterface.bulkInsert(options, [
      {
        "spotId": 1,
        "url": "https://computersciencehero.com/wp-content/uploads/2019/10/51573033_2076486832438827_2048960555678433280_n.jpg",
        "preview": true
      },
      {
        "spotId": 2,
        "url": "https://variety.com/wp-content/uploads/2022/08/HBO-Max-Sesame-Street.jpg",
        "preview": true
      },
      {
        "spotId": 3,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": false
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }

};
