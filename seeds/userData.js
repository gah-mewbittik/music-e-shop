const {User} = require('../models');

const userData = [
    {
        username: 'Al',
        email: 'al@hotmail.com',
        password: 'password12345'
      },
      {
        username: 'Leonard',
        email: 'leonard@gmail.com',
        password: 'password12345'
      },
      {
        username: 'Niko',
        email: 'niko2k20@aol.com',
        password: 'password12345'
      },
      {
        username: 'Jordan',
        email: 'jordan99@msn.com',
        password: 'password12345'
      },
      {
        username: 'Jake',
        email: 'Jake@yahoo.com',
        password: 'password12345'
      }, 
      {
        username: 'Ben',
        email: 'ben@yahoo.com',
        password: 'password12345'
      },
      {
        username: 'Blake',
        email: 'the_blake@yahoo.com',
        password: 'password12345'
      }  
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;