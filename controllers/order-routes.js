const router = require('express').Router();

const { User } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try{
      const userData = await User.findAll({
        include: [{
          model: User,
          attributes: ['id', 'username'],
        },
      ],
   
      });

      const orders = userData.map((order) => order.get)({plain: true});
      res.render('order', {
        loggedIn: req.session.loggedIn
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