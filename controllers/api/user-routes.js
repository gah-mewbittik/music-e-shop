const router = require('express').Router();
const { User } = require('../../models');


//Get All users
router.get('/', async (req, res) => {
  try{
    const userData = await User.findAll({
      where: { id: req.session. user_id },
    });

    const users = userData.map((user) => user.get({plain: true}));
      res.json(users);
    

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

//Get a single User
router.get('/:id', async (req, res) => {
  try{
    const user = await User.findByPk(req.params.id, {
      include: [{
        attributes: ['username', 'email'],
      }],
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

// Login TODO: Look at the option of moving the below code to login-routes
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
