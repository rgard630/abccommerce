// models/Tag.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Product = require('./Product');
const ProductTag = require('./ProductTag');

const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tag_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

module.exports = Tag;


