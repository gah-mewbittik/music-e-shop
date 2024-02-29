const router = require('express').Router();

const userRoutes = require('./user-routes');
const orderRoutes = require('./order-routes');
const productRoutes = require('./product-routes');

router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/products', productRoutes);

module.exports = router;