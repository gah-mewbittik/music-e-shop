const {Product} = require('../models');

const productData = [
    {
        name: 'Magazine',
        image_url:'https://isteam.wsimg.com/ip/6d9a06b8-8689-4207-8681-8e0845dc50e4/ols/72_original/:/rs=w:600,h:600',
        description: 'Limited Ed. Autographed magazine',
        price: 14.99,
        featured: true,
    },
    {
        name: 'T-Shirt',
        image_url:'https://isteam.wsimg.com/ip/6d9a06b8-8689-4207-8681-8e0845dc50e4/ols/63_original/:/rs=w:600,h:600',
        description: 'One size fits all T-shirt',
        price: 19.99,
        featured: true,
    },
    {
        name: 'CD',
        description: 'Sounds of a Seed physical album',
        image_url:'https://isteam.wsimg.com/ip/6d9a06b8-8689-4207-8681-8e0845dc50e4/ols/77_original/:/rs=w:600,h:600',
        price: 9.99,
        featured: true,
    },
    {
        name: 'mug',
        image_url:'https://isteam.wsimg.com/ip/6d9a06b8-8689-4207-8681-8e0845dc50e4/ols/67_original/:/rs=w:600,h:600',
        description: 'Stainless steel hot beverage cup',
        price: 4.99,
        featured: true,
    },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;