const router = require('express').Router();
const { User, Order, Product, OrderProduct } = require('../models');
//const withAuth = require('../utils/auth');

// Get homepage
router.get('/', (req, res) => {
  res.render('homepage');
});





module.exports = router;