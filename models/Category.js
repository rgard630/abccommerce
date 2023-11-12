// models/Category.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
