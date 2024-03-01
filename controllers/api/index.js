const router = require('express').Router();

const userRoutes = require('./user-routes');
const orderRoutes = require('./order-routes');
const productRoutes = require('./product-routes');
const cartRoutes = require('./cart-routes.js');

router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/cart', cartRoutes);
router.use('/products', productRoutes);


module.exports = router;