const router = require('express').Router();
//const { User, Post, Comment } = require('../models');
// TODO: - NEED to add restriction access to see if logged in.

router.get('/', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('account');
  });

  module.exports = router;