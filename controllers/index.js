const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const loginRoutes = require('./login-routes');
const accountRoutes = require('./account-routes');
const orderRoutes = require('./order-routes');

router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/account', accountRoutes);
router.use('/order', orderRoutes);

router.use('/api', apiRoutes);

module.exports = router;