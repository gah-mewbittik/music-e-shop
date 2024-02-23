const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class OrderProduct extends Model {};

OrderProduct.init({

});

module.exports = OrderProduct;