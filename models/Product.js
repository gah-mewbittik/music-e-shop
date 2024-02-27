const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Product extends Model {};

Product.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),

  }, 
  featured: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  //TODO: Look into if you can add an image or image link
  },
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;