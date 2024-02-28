const router = require('express').Router();

const { User, Order, Product, OrderProduct } = require('../models');
const { update } = require('../models/User');
const withAuth = require('../utils/auth');

//TODO: CRUD (Create, Read, Update, Delete) may only need CREATE 

// Gets(reads) ALL Orders
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

//Get(read) a single Order
router.get('/:id', async (req, res) => {
  try{
    const order = await Order.findByPk(req.params.id, {
      include: [{
        model: Product,
        attributes: ['name', 'price'],
        //through: {attributes: ['quantity']}
      }],
    });

    if(!order){
      return res.status(404).json({message: 'Order not found'});
    }

    res.json(order);

  }catch(err){
    res.status(500).json(err);
  }
});

// Posts(Creates) a new Order
router.post('/', async (req, res) => {
  try{
    const newOrder = await Order.create({
      user_id: req.body.user_id,
    });

    for(const p of req.body.products){
      const record = {
        order_id: newOrder.id,
        product_id: p.id,
        quantity: p.quantity,
      };
      await OrderProduct.create(record);
    }

    return res.status(201).json({message: 'Order created successfully', order: newOrder});

  }catch(err){
    res.status(500).json(err);
  }
});

// Put(Update) an Order TODO: do we really need update Order?
router.put('/:id', async (req, res) => {
  try{
     const updateOrder = await Order.update( 
      {
        order_date: req.body.order_date,
     },
     {
      where: {
        id: req.params.id,
      },
     });
     return res.status(200).json(updateOrder);

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete(destroy) an Order
router.delete('/:id', async (req, res) => {
  try{
    const deleteOrder = await Order.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(deleteOrder){
      return res.status(200).json({message: 'Order DELETED Successfully'});
    }else{
      return res.status(404).json({message: 'Order Not Found'});
    }
  }catch(err){
    console.log(err);
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