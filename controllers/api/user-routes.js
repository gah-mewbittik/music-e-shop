const router = require('express').Router();
const { User } = require('../../models');

const idValidation = require('../../utils/idValidation');


//Get All users
router.get('/', async (req, res) => {
  try{
    const userData = await User.findAll({});

    const users = userData.map((user) => user.get({plain: true}));
      res.json(users);
    

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

//Get a single User
router.get('/:id', idValidation, async (req, res) => {
  try{
    const user = await User.findOne({
      where: {id: req.params.id },
    });

    if(!user){
      return res.status(404).json({message: 'User not found'});
    }

    res.json(user);

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Delete a user
router.delete('/:id', idValidation, async (req, res) => {
  try{
    const deleteUser = await User.destroy({
      where: {
          id: req.params.id,
        },
      });

      if(deleteUser){
        return res.status(200).json({message: 'User DELETED Successfully'});
  }else{
    return res.status(204).json();
  }

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

//Update a user
router.put('/:id', idValidation, async (req, res) => {
  try{
    const updateUser = await User.update( 
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.email,
     },
     {
      where: {
        id: req.params.id,
      },
     });
     return res.status(200).json(updateUser);

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO: Review Login

// Login 
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
