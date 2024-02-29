const router = require('express').Router();

const { User, Order, Product, OrderProduct } = require('../../models');
//const withAuth = require('../../utils/auth');
const idValidation = require('../../utils/idValidation');


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