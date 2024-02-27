const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const User = require('./User');

class Order extends Model {};

Order.init({
  id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  order_date: {
    type: DataTypes.DATE(6),
    allowNull: false,
  },
  total: {
    type: DataTypes.VIRTUAL,
  get(){
    //calculated total from products 
    if(this.products){
    return this.products.reduce((total, product) => total + product.price, 0);
  }
  else {return 0}; //Defaults to zero if there are no products
},
},
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'order',
  }
);

module.exports = Order;