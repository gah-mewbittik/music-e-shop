const sequelize = require('../config/connection');
const seedGallery = require('./galleryData');
const seedPaintings = require('./paintingData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

// TODO: ADD function data here from seed files' data

  process.exit(0);
};

seedAll();