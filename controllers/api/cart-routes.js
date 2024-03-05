const router = require('express').Router();
const { Product } = require('../../models');

//Initialize req.session.cart if it's undefined.
router.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
});


// get everything in the cart
router.get('/', (req, res) => {
    // if (!req.session.cart) return res.json([]);
    return res.json(req.session.cart);
});

// Calculate the grand total sum of all products in the cart.
router.get('/total', (req, res) => {
    let grandTotal = 0;
    req.session.cart.forEach(item => {
        grandTotal += item.total;
    });

    // // Update the html element to display the latest grand total..
    // document.getElementById('grandTotal').innerText = `Grand Total: $${grandTotal}`;

    // Return the grand total as JSON response
    return res.json({ grandTotal });
});

// add a single item to cart 
router.post('/', async (req, res) => {
    console.log('req.body: ', req.body);
    const p = await Product.findByPk(parseInt(req.body.pid));
    if (!p) return res.status(404).json({ error: `product with id ${req.body.pid} not found` });
    const product = p.get({ plain: true });
    const existingItemIndex = req.session.cart.findIndex(item => item.pid === product.id);
    if (existingItemIndex !== -1) {
        //If the product already exists in the cart, increment its quantity
        req.session.cart[existingItemIndex].quantity += req.body.quantity;
        req.session.cart[existingItemIndex].total += product.price * req.body.quantity;
    } else {
        // If the product is not in the cart add it
        const cartItem = {
            pid: product.id,
            name: product.name,
            image_url: product.image_url,
            price: product.price,
            quantity: req.body.quantity,
            total: product.price * req.body.quantity
        };
        // if(!req.session.cart) {
        //     req.session.cart = [cartItem];
        // }
        // else {
        req.session.cart.push(cartItem);
    }
    return res.status(201).json();
});

// remove item from the cart
router.delete('/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    const index = req.session.cart.findIndex(item => item.pid === productId);//
    if (index !== -1) {
        req.session.cart.splice(index, 1); //Remove the item from the cart array.      
        return res.status(200).json({});
    } else {
        return res.status(404).json({ error: 'Product not found in cart' });
    }
});



module.exports = router;