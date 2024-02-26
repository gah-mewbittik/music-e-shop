const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class OrderProduct extends Model {};

OrderProduct.init({

},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'orderProduct',
  }
);

module.exports = OrderProduct;