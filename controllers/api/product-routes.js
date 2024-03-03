const router = require('express').Router();

const idValidation = require('../../utils/idValidation');
const { User, Order, Product, OrderProduct } = require('../../models');

//Get all products
router.get('/', async (req, res) => {
    try{
        const productData = await Product.findAll({});

        const products = productData.map((product) => product.get({plain: true}));

        res.json(products);
        
    }catch(err){
        res.status(500).json(err);
    }
});

//Get a single product
router.get('/:id', idValidation, async (req, res) => {
    try{
        const product = await Product.findOne({
          where:{id: req.params.id },
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

//Post - Create a product
router.post('/', async (req, res) => {
    try{
        const newProduct = await Product.create({
            name: req.body.name,
            image_url: req.body.image_url,
            description: req.body.description,
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

//PUT - Update a product
router.put('/:id', idValidation, async (req, res) => {
    try{
        const updateProduct = await Product.update(
            {
                name: req.body.name,
                image_url: req.body.image_url,
                description: req.body.description,
                price: req.body.price,
                featured: req.body.featured,
            },
            {
            where: {id: req.params.id},
            }
        );
        return res.status(200).json(updateProduct);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

//Delete - destroy a product 
router.delete('/:id', idValidation, async (req, res) => {
    try{
        const deleteProduct = await Product.destroy({
            where: {
                id: req.params.id,
              },
        });

        if(deleteProduct){
            return res.status(200).json({message: 'Product DELETED Successfully'});
      }else{
        return res.status(204).json();
      }
        
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
