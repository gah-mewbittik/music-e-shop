const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const Product = require('./Product');
const Order = require('./Order');

class OrderProduct extends Model {};

OrderProduct.init({
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: 'id',
      },
    },
    product_id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'orderProduct',
  }
);

module.exports = OrderProduct;