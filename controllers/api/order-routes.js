const router = require('express').Router();

const sequelize = require('../../config/connection');
const { User, Order, Product, OrderProduct } = require('../../models');
const withAuth = require('../../utils/auth');
const idValidation = require('../../utils/idValidation');

//Get All orders
router.get('/', withAuth, async (req, res) => {
  try{
    const orderData = await Order.findAll({
    //   where: { id: req.session. user_id },
    //   include: [{
    //     model: Order,
    //     attributes: ['id', 'order_date', 'total'],
    //     include: [{
    //       model: Product, 
    //       attributes: ['id', 'name', 'price']
    //     },
    //   ],
    //   },
    // ],
 
    });

    const orders = orderData.map((order) => order.get({plain: true}));
    res.json(orders);//, {orders, loggedIn: req.session.loggedIn});

  }catch(err){
    res.status(500).json(err);
  }
});

//Get(read) a single Order
router.get('/:id', idValidation, async (req, res) => {
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
  
  // Posts(Creates) a new Order TODO: need to fix total 
  router.post('/', async (req, res) => {
    console.log('REQUEST BODY: ', req.body)    
    try{
      
      const newOrder = await Order.create({
        user_id: req.body.user_id,//Store user_id 
        order_date: new Date(),
      });
        
      for(const p of req.body.products){ // This didn't work because it seems order_id = null
        const product = await Product.findByPk(p.id);
        if (!product) return res.status(404).json({err: `Product with id ${p.id} not found`});
        const record = {
          order_id: newOrder.id,
          orderId: newOrder.id,
          product_id: p.id,
          productId: p.id,
          quantity: p.quantity,
        };

        await OrderProduct.create(record);
      }
    

      return res.status(201).json({message: 'Order created successfully', order: newOrder });
      
    }catch(err){
      console.log(err);
  
      res.status(500).json(err);
    }
  });
  
  // Put(Update) an Order (Backlog)
  router.put('/:id', idValidation, async (req, res) => {
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
  router.delete('/:id', idValidation, async (req, res) => {
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