const {Product} = require('../models');

const productData = [
    {
        name: 'cd',
        description: 'Old school compact disc',
        price: 8.99,
        featured: true,
    },
    {
        name: 'poster',
        description: 'Awesome live performance shot!',
        price: 12.99,
        featured: true,
    },
    {
        name: 'wrist band',
        description: 'Showing the ultimate support',
        price: 5.99,
        featured: false,
    },
    {
        name: 'hat',
        description: 'The Style',
        price: 24.99,
        featured: false,
    },
    {
        name: 'key chain',
        description: 'The bling bling of tomorrow',
        price: 19.99,
        featured: false,
    },
    {
        name: 'vinyl',
        description: 'The Old Old School!!!',
        price: 49.99,
        featured: true,
    },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;