const router = require('express').Router();
const { User, Order, Product, OrderProduct } = require('../../models');
const withAuth = require('../../utils/auth');

// Get homepage
router.get('/', (req, res) => {
  res.render('homepage');
});

// Get login
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//Get account
router.get('/account', withAuth, async (req, res) => {
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

//Get order
router.get('/order', withAuth, async (req, res) => {
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