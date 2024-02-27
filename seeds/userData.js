const {User} = require('../models');

const userData = [
    {
        name: 'Al',
        email: 'al@hotmail.com',
        password: 'password12345'
      },
      {
        name: 'Leonard',
        email: 'leonard@gmail.com',
        password: 'password12345'
      },
      {
        name: 'Niko',
        email: 'niko2k20@aol.com',
        password: 'password12345'
      },
      {
        name: 'Jordan',
        email: 'jordan99@msn.com',
        password: 'password12345'
      },
      {
        name: 'Jake',
        email: 'Jake@yahoo.com',
        password: 'password12345'
      }, 
      {
        name: 'Ben',
        email: 'ben@yahoo.com',
        password: 'password12345'
      },
      {
        name: 'Blake',
        email: 'the_blake@yahoo.com',
        password: 'password12345'
      }  
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;