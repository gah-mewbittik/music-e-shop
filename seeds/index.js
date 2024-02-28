const sequelize = require('../config/connection');

const seedUsers = require('./userData');
const seedProducts = require('./productData');

const seedAll = async () => {
  await sequelize.sync({ force: true });


  await seedUsers();
  await seedProducts();

  process.exit(0);
};

seedAll();