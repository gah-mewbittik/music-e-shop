const router = require('express').Router();
//const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  module.exports = router;