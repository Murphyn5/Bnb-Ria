'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "456 Oak Street",
        city: "Los Angeles",
        state: "CA",
        country: "United States of America",
        lat: 34.0631473,
        lng: -118.3260837,
        name: "Cozy Studio Apartment",
        description: "Charming studio apartment with all the essentials for a comfortable stay.",
        price: 89.00
      },
      {
        ownerId: 2,
        address: "123 Main St",
        city: "New York",
        state: "NY",
        country: "United States of America",
        lat: 40.712776,
        lng: -74.005974,
        name: "Soho Loft",
        description: "Stylish and spacious loft in the heart of Soho",
        price: 250.00
      },
      {
        ownerId: 3,
        address: "456 Hollywood Blvd",
        city: "Los Angeles",
        state: "CA",
        country: "United States of America",
        lat: 34.101498,
        lng: -118.325856,
        name: "Hollywood Hills Villa",
        description: "Luxurious villa with stunning views of the Hollywood Hills",
        price: 500.00
      },
      {
        ownerId: 4,
        address: "789 Ocean Ave",
        city: "Miami Beach",
        state: "FL",
        country: "United States of America",
        lat: 25.784485,
        lng: -80.130271,
        name: "Oceanfront Condo",
        description: "Beautiful condo with direct access to the beach",
        price: 300.00
      },
      {
        ownerId: 5,
        address: "910 Washington St",
        city: "Boston",
        state: "MA",
        country: "United States of America",
        lat: 42.358430,
        lng: -71.059770,
        name: "Historic Brownstone",
        description: "Beautiful and historic brownstone in the heart of Boston",
        price: 80.00
      },
      {
        ownerId: 6,
        address: "1234 Elm St",
        city: "Austin",
        state: "TX",
        country: "United States of America",
        lat: 30.267153,
        lng: -97.743061,
        name: "Cozy Casita",
        description: "Charming and cozy casita in a quiet neighborhood",
        price: 85.00
      },
      {
        ownerId: 7,
        address: "1234 Market St",
        city: "San Francisco",
        state: "CA",
        country: "United States of America",
        lat: 37.777002,
        lng: -122.416188,
        name: "Luxury Penthouse",
        description: "Stunning penthouse with breathtaking views of San Francisco",
        price: 800.00
      },
      {
        ownerId: 8,
        address: "5678 Fifth Ave",
        city: "New York",
        state: "NY",
        country: "United States of America",
        lat: 40.764863,
        lng: -73.973053,
        name: "Central Park View",
        description: "Spacious apartment with a stunning view of Central Park",
        price: 400.00
      },
      {
        ownerId: 9,
        address: "910 Maple Ave",
        city: "Minneapolis",
        state: "MN",
        country: "United States of America",
        lat: 44.977753,
        lng: -93.265015,
        name: "Modern Apartment",
        description: "Stylish and modern apartment in the heart of Minneapolis",
        price: 75.00
      },
      {
        ownerId: 10,
        address: "123 Main St",
        city: "Portland",
        state: "OR",
        country: "United States of America",
        lat: 45.523064,
        lng: -122.676483,
        name: "Cozy Studio",
        description: "Comfortable studio in the heart of downtown Portland",
        price: 80.00
      },
      {
        ownerId: 11,
        address: "456 Elm St",
        city: "Austin",
        state: "TX",
        country: "United States of America",
        lat: 30.267153,
        lng: -97.743060,
        name: "Colorful Cottage",
        description: "Quirky and colorful cottage in the heart of Austin",
        price: 90.00
      },
      {
        ownerId: 12,
        address: "789 Maple St",
        city: "Chicago",
        state: "IL",
        country: "United States of America",
        lat: 41.878114,
        lng: -87.629798,
        name: "Urban Retreat",
        description: "Relaxing and cozy apartment in the heart of Chicago",
        price: 75.00
      },
      {
        ownerId: 13,
        address: "1234 Main St",
        city: "Denver",
        state: "CO",
        country: "United States of America",
        lat: 39.739236,
        lng: -104.990251,
        name: "Charming Bungalow",
        description: "Lovely bungalow in the heart of Denver's historic district",
        price: 95.00
      },
      {
        ownerId: 14,
        address: "5678 Oak St",
        city: "Nashville",
        state: "TN",
        country: "United States of America",
        lat: 36.162664,
        lng: -86.781602,
        name: "Music City Studio",
        description: "Cozy and stylish studio in the heart of Nashville",
        price: 85.00
      },
      {
        ownerId: 15,
        address: "910 Elmwood Ave",
        city: "Buffalo",
        state: "NY",
        country: "United States of America",
        lat: 42.912197,
        lng: -78.842229,
        name: "Rustic Retreat",
        description: "Charming and rustic cabin in a peaceful neighborhood",
        price: 70.00
      },
      {
        ownerId: 16,
        address: "1234 Broadway",
        city: "Seattle",
        state: "WA",
        country: "United States of America",
        lat: 47.608013,
        lng: -122.335167,
        name: "Modern Loft",
        description: "Spacious and stylish loft in the heart of Seattle",
        price: 95.00
      },
      {
        ownerId: 17,
        address: "5678 Market St",
        city: "Philadelphia",
        state: "PA",
        country: "United States of America",
        lat: 39.952583,
        lng: -75.165222,
        name: "Historic Rowhouse",
        description: "Charming rowhouse in the heart of Philadelphia's historic district",
        price: 80.00
      },
      {
        ownerId: 18,
        address: "910 Main St",
        city: "Kansas City",
        state: "MO",
        country: "United States of America",
        lat: 39.099724,
        lng: -94.578331,
        name: "Cozy Cottage",
        description: "Adorable and cozy cottage in a peaceful neighborhood",
        price: 75.00
      },
      {
        ownerId: 19,
        address: "1234 Oak St",
        city: "New Orleans",
        state: "LA",
        country: "United States of America",
        lat: 29.951065,
        lng: -90.071533,
        name: "French Quarter Studio",
        description: "Stylish and cozy studio in the heart of the French Quarter",
        price: 85.00
      },
      {
        ownerId: 20,
        address: "5678 Pine St",
        city: "San Diego",
        state: "CA",
        country: "United States of America",
        lat: 32.715736,
        lng: -117.161087,
        name: "Beach Bungalow",
        description: "Charming and cozy bungalow just steps from the beach",
        price: 90.00
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
