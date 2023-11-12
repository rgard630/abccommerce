// models/ProductTag.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Product = require('./Product');
const Tag = require('./Tag');

const ProductTag = sequelize.define('ProductTag', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
});

ProductTag.belongsTo(Product, {
  foreignKey: 'product_id',
});

ProductTag.belongsTo(Tag, {
  foreignKey: 'tag_id',
});

module.exports = ProductTag;


