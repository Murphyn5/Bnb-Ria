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
        "url": "https://upload.wikimedia.org/wikipedia/commons/4/48/Jardinette_Apartments_%28Richard_Neutra%29%2C_Hollywood.JPG",
        "preview": true
      },
      {
        "spotId": 2,
        "url": "https://upload.wikimedia.org/wikipedia/commons/e/e7/In_new_york%2C_even_the_mundane_is_beautiful_%286773012377%29.jpg",
        "preview": true
      },
      {
        "spotId": 3,
        "url": "https://upload.wikimedia.org/wikipedia/commons/7/72/Case_Study_House_22_%285901923987%29.jpg",
        "preview": true
      },
      {
        "spotId": 4,
        "url": "https://c0.wallpaperflare.com/preview/47/880/853/united-states-miami-beach-south-beach-sunny.jpg",
        "preview": true
      },
      {
        "spotId": 5,
        "url": "https://live.staticflickr.com/65535/52576517803_2bcf62419f_b.jpg",
        "preview": true
      },
      {
        "spotId": 6,
        "url": "https://perennials.imgix.net/wp-content/uploads/2022/03/12060253/franck-lounge-vvd-fabrics-casita.jpg",
        "preview": true
      },
      {
        "spotId": 7,
        "url": "https://c1.wallpaperflare.com/preview/768/780/946/california-cars-descending-drivers-thumbnail.jpg",
        "preview": true
      },
      {
        "spotId": 8,
        "url": "https://p1.pxfuel.com/preview/415/440/3/central-park-usa-manhattan-central-park-new-york.jpg",
        "preview": true
      },
      {
        "spotId": 9,
        "url": "https://live.staticflickr.com/1885/44066864822_f7e54328a8_b.jpg",
        "preview": true
      },
      {
        "spotId": 10,
        "url": "https://upload.wikimedia.org/wikipedia/commons/8/83/Bronaugh_Apartments_-_Portland%2C_Oregon.JPG",
        "preview": true
      },
      {
        "spotId": 11,
        "url": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Connelly_yerwood_house_2007.jpg",
        "preview": true
      },
      {
        "spotId": 12,
        "url": "https://cdn4.picryl.com/photo/2019/10/04/living-room-at-the-hideout-the-northwoods-retreat-of-chicago-gangster-al-capone-67b63f-1024.jpg",
        "preview": true
      },
      {
        "spotId": 13,
        "url": "https://live.staticflickr.com/7146/6780672731_78422e3900_b.jpg",
        "preview": true
      },
      {
        "spotId": 14,
        "url": "https://c1.wallpaperflare.com/preview/794/738/426/urban-building-city-nyc.jpg",
        "preview": true
      },
      {
        "spotId": 15,
        "url": "https://www.remodelista.com/wp-content/uploads/2022/08/charles-de-lisle-sonoma-house-8-3.jpg",
        "preview": true
      },
      {
        "spotId": 16,
        "url": "https://p1.pxfuel.com/preview/254/479/626/architecture-no-person-himmel-glass-contemporary-apartment-building.jpg",
        "preview": true
      },
      {
        "spotId": 17,
        "url": "https://upload.wikimedia.org/wikipedia/commons/9/90/Row_Houses%2C_West_Philly.jpg",
        "preview": true
      },
      {
        "spotId": 18,
        "url": "https://upload.wikimedia.org/wikipedia/commons/9/9d/3401_Gladstone_Blvd_-This_5076_sq._f._incredible_stone_mansion_has_6_bedrooms_and_3.0_bath._%28_Year_b._1910%29_-_Kansas_City%2C_Missouri_-_Historic_Pendleton_Heights_-_panoramio.jpg",
        "preview": true
      },
      {
        "spotId": 19,
        "url": "https://c1.wallpaperflare.com/preview/370/225/309/new-orleans-louisiana-usa-southern-states.jpg",
        "preview": true
      },
      {
        "spotId": 20,
        "url": "https://c.pxhere.com/photos/32/c2/california_nikon_sandiego_pacificocean_socal_southerncalifornia_oceanview_sandiegoca-419687.jpg!d",
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
