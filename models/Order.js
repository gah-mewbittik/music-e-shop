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
    console.log('Products: ', this.products);
    //calculated total from products 
    if(this.products){
      const total = this.products.reduce((total, product) => total + product.price, 0);
      console.log('Total', total);
      return total
    
  }else{console.log('No Products found, returning 0'); return 0} //Defaults to zero if there are no products
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