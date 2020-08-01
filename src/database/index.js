const sequelize = require('sequelize');
const dbConfig = require('../config/database');
const { Sequelize } = require('sequelize');

const connection = new Sequelize(dbConfig);

module.exports = connection;