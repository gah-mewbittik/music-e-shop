const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Order extends Model {};

Order.init({

});

module.exports = Order;