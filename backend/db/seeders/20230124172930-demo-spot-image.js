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
        "preview": true
      },
      {
        "spotId": 4,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      },
      {
        "spotId": 5,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      },
      {
        "spotId": 6,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      },
      {
        "spotId": 7,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      },
      {
        "spotId": 8,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      },
      {
        "spotId": 9,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      },
      {
        "spotId": 10,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      },
      {
        "spotId": 11,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      },
      {
        "spotId": 12,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      },
      {
        "spotId": 13,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      },
      {
        "spotId": 14,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      },
      {
        "spotId": 15,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      },
      {
        "spotId": 16,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      },
      {
        "spotId": 17,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      },
      {
        "spotId": 18,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      },
      {
        "spotId": 19,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      },
      {
        "spotId": 20,
        "url": "https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954",
        "preview": true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
    }, {});
  }

};
