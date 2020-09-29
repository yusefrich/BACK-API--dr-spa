
const bcrypt = require('bcryptjs');
const password = 'admin'
const hash = bcrypt.hashSync(password, 10);

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


    return queryInterface.bulkInsert('users', [{
      name: 'admin',
      email: 'admin@admin.com',
      role_id: 1,
      password: hash,
      created_at: new Date(),
      updated_at: new Date()

    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
