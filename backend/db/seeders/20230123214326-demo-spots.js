'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
     options.tableName = 'Spots';
     return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "CA",
        country: "United States of America",
        lat: 37.7645358,
        lng: 122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123.00
      },
      {
        ownerId: 2,
        address: "123 SESAME STREET",
        city: "Television",
        state: "PBS",
        country: "Cookieland",
        lat: 27.1234567,
        lng: 123.7654321,
        name: "Oscars Trash Can",
        description: "Where Oscar lives",
        price: 1.00
      },
      {
        ownerId: 3,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      },
      {
        ownerId: 1,
        address: "345 Cartoon Network",
        city: "Suburbia",
        state: "WA",
        country: "United States of America",
        lat: 89.3456789,
        lng: 670.9876543,
        name: "Dexter's Laboratory",
        description: "Get out DIDI",
        price: 10000000.00
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }

};
