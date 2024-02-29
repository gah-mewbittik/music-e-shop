const router = require('express').Router();

const idValidation = require('../utils/idValidation');
const { User, Order, Product, OrderProduct } = require('../models');

//Get all products
router.get('/', async (req, res) => {
    try{
        const productData = await Product.findAll({});

        const products = productData.map((product) => product.get({plain: true}));
      res.render('products', {products});

    }catch(err){
        res.status(500).json(err);
    }
});

//Get a single product
router.get('/:id', idValidation, async (req, res) => {
    try{
        const product = await Product.findByPk(req.params.id, {
            include: [{
                attributes: ['name', 'description', 'price'],
            }],
        });
        
        if(!product){
            return res.status(404).json({message: 'Product not found'});
          }
      
          res.json(product);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//Post - Create a product TODO: YOU are you.
router.post('/', async (req, res) => {
    try{
        const newProduct = await Product.create({
            name: req.body.name,
            description: req.body.name,
            price: req.body.prices,
            featured: req.body.featured,
          });
      req.session.save(() => {
        res.status(200).json(newProduct);
      })

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
