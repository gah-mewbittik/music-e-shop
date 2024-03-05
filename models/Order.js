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
  
    // 1 - virtual total (did not cover this in the course)
    // [X] 2 - don't have total
    // 3 - column total (actually saves on database) ---> Pro: , less query to quick total look up total
    // Con: 1)redundacy, 2) if there is an update to the order itesm, this needs to be recalculated, 
    // otherwise, we are going to have bad data in the database

},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'order',
  }
);

module.exports = Order;