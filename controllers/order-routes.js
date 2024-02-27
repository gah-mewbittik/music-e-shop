const router = require('express').Router();

const { User, Order, Product } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try{
      const orderData = await User.findAll({
        where: { id: req.session. user_id },
        include: [{
          model: Order,
          attributes: ['id', 'order_date', 'total'],
          include: [{
            model: Product, 
            attributes: ['id', 'name', 'price']
          },
        ],
        },
      ],
   
      });

      const orders = orderData.map((order) => order.get({plain: true}));
      res.render('order', {
        orders, loggedIn: req.session.loggedIn
      });

    }catch(err){
      res.status(500).json(err);
    }
  });


  module.exports = router;

  // router.get('/', (req, res) => {
  //   // If a session exists, redirect the request to the homepage
  //   if (req.session.logged_in) {
  //     res.redirect('/');
  //     return;
  //   }
  
  //   res.render('order');
  // });