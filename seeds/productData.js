const {Product} = require('../models');

const productData = [
    {
        name: 'Magazine',
        image_url:'images/magazine.webp',
        description: 'Limited Ed. Autographed magazine',
        price: 14.99,
        featured: true,
    },
    {
        name: 'T-Shirt',
        image_url:'images/tshirt.png',
        description: 'One size fits all T-shirt',
        price: 19.99,
        featured: true,
    },
    {
        name: 'CD',
        description: 'Sounds of a Seed physical album',
        image_url:'images/cd.png',
        price: 9.99,
        featured: true,
    },
    {
        name: 'Mug',
        image_url:'https://isteam.wsimg.com/ip/6d9a06b8-8689-4207-8681-8e0845dc50e4/ols/67_original/:/rs=w:600,h:600',
        description: 'Stainless steel hot beverage cup',
        price: 4.99,
        featured: true,
    },
    {
        name: 'Hoodie',
        image_url:'images/hoodie.jpg',
        description: 'One size fits all hoodie',
        price: 24.99,
        featured: true,
    },
    {
        name: 'Sticker!',
        image_url:'images/sticker.jpg',
        description: 'Bubble-free stickers',
        price: 0.99,
        featured: true,
    },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;