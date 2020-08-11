const sequelize = require('sequelize');
const dbConfig = require('../config/database');
const { Sequelize } = require('sequelize');

const User = require ('../models/User')
const Address = require ('../models/Address')
const Role = require ('../models/Role')

const connection = new Sequelize(dbConfig);

Role.init(connection);
User.init(connection);
Address.init(connection);

Role.associate(connection.models);
User.associate(connection.models);
Address.associate(connection.models);

module.exports = connection;