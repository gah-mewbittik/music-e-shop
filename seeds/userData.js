const {User} = require('../models');
const bcrypt = require('bcrypt');

const userData = [
    {
        username: 'Al',
        email: 'al@hotmail.com',
        password: 'password12'
      },
      {
        username: 'Leonard',
        email: 'leonard@gmail.com',
        password: 'password12'
      },
      {
        username: 'Niko',
        email: 'niko2k20@aol.com',
        password: 'password12'
      },
      {
        username: 'Jordan',
        email: 'jordan99@msn.com',
        password: 'password12'
      },
      {
        username: 'Jake',
        email: 'Jake@yahoo.com',
        password: 'password12'
      }, 
      {
        username: 'Ben',
        email: 'ben@yahoo.com',
        password: 'password12'
      },
      {
        username: 'Blake',
        email: 'the_blake@yahoo.com',
        password: 'password12'
      }  
];

const seedUsers = async () => {
  //hash password before creating user
  const usersWithHashedPass = userData.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 10)
  }));
  await User.bulkCreate(usersWithHashedPass);
}
  

module.exports = seedUsers;