'use strict';
const bcrypt = require("bcryptjs");
const seedUsers = require('/Users/nicholasmurphy/aa-projects/practice-for-sprint-12-authenticate-me-for-render-deployment/authenticate-me/backend/utils/fakerSeed.js')


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users = seedUsers(5)
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options,
      [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Bill',
        lastName: 'Ding',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Chet',
        lastName: 'Faker',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'Nick',
        lastName: 'Murphy',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ]
    // users
    , {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
