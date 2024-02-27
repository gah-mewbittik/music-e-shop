const User = require('./User');
const Order = require('./Order');
const Product = require('./Product');
const OrderProduct = require('./OrderProduct');

Order.belongsTo(User);
User.hasMany(Order);

Product.belongsToMany(Order, { through: OrderProduct });
Order.belongsToMany(Product, { through: OrderProduct });

module.exports = { User, Order, Product, OrderProduct };