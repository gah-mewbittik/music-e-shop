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

      const accounts = userData.map((account) => account.get)({plain: true});
      res.render('account', {
        loggedIn: req.session.loggedIn
      });

    }catch(err){
      res.status(500).json(err);
    }
  });

  module.exports = router;

  // Used the below, just to get functionality working for main handlebars
  // router.get('/', (req, res) => {
  //   // If a session exists, redirect the request to the homepage
  //   if (req.session.logged_in) {
  //     res.redirect('/');
  //     return;
  //   }
  
  //   res.render('account');
  // });