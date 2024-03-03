const router = require('express').Router();
const { Product } = require('../../models');


// get everything in the cart
router.get('/', (req, res) => {
    if (!req.session.cart) return res.json([]);
    return res.json(req.session.cart);
});

// add a single item to cart TODO: Change how Total is calculated.
router.post('/', async (req, res) => {
    console.log('req.body: ', req.body);
    const p = await Product.findByPk(parseInt(req.body.pid));
    if (!p) return res.status(404).json({error: `product with id ${req.body.pid} not found`});
    const product = p.get({plain: true});
    const cartItem = {
        pid: product.id,
        name: product.name,
        price: product.price,
        quantity: req.body.quantity,
        total: product.price * req.body.quantity
    };
    if(!req.session.cart) {
        req.session.cart = [cartItem];
    }
    else {
        req.session.cart.push(cartItem);
    }    
    return res.status(201).json();
});

// remove item from the cart


module.exports = router;