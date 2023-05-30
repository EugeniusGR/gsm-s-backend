const { default: mongoose } = require('mongoose');
const User = require('../models/User');

const addUser = (req, res) => {
  const { fullName, country, email, password } = req.body;
  const user = new User({
    fullName,
    country,
    email,
    password,
    createdAt: new Date(),
  });
  user
    .save()
    .then((result) => {
      console.log('new user added', result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const loginUser = async (req, res) => {
  console.log('req.query', req.query);
  const { email, password } = req.query;
  console.log('start search', email);
  console.log(req.body);
  const user = await User.findOne({ email }).exec();
  if (!user) {
    res.status(500).send({ error: 'User not found' });
  } else {
    if (user.password === password) {
      res.send(user);
    } else {
      res.status(400).send({ error: 'Wrong password' });
    }
  }
};

const getUserFromDB = async (userId) => {
  const user = await User.findById(userId).exec();
  console.log('user Found', user);
  return user;
};

module.exports = {
  addUser,
  loginUser,
  getUserFromDB,
};
