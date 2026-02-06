const User = require('../models/user');

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error('Email and passport are required.');
  }
  const hashedPassword = await User.hashedPassword(password);
  const newUser = await User.create({
    email,
    password: hashedPassword
  });
  const token = await User.generateToken();
  delete newUser._doc.password;
  res.status(201).json({
    message: 'Account created successfully',
    token,
    user: newUser
  })
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error('Email and passport are required.');
  }
  const user = await User.findOne({email}).select('+password');
  if (!user) return res.status(400).json({
    message: 'Invalid credentials'
  });
  const validate = await User.isValidPassword(password);
  if (!validate) return res.status(400).json({
    message: 'Invalid credentials'
  });
  const token = await User.generateToken();
  delete user._doc.password;
  res.status(200).json({
    message: 'Account login successfully',
    token,
    user
  });
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  if (allUsers.length > 0) {
    res.status(200).json({
      message: 'Users fetch successfully',
      users: allUsers
    });
  } else {
    res.status(200).json({
      message: 'No users found.',
      users: []
    });
  }
};

module.exports = { register, login, getAllUsers };