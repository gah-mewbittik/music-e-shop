const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Order extends Model {};

Order.init({
  id:{
    type: DataTypes.INTEGER,
    
  }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'order',
  }
);

module.exports = Order;