const User = require('../models/User');

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
}



async function signup(req, res) {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send('El correo electrónico ya existe');
    }
    res.status(400).send(error.message);
  }
}



async function getUsers(req, res) {
  try {
    const users = await User.find({ isAdmin: false }).populate('orders');
    res.json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getUserOrders(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate('orders');
    res.json(user.orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
}










module.exports = { login,signup,getUsers,getUserOrders};
