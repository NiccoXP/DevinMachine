const User = require('../models/user');

const createUser = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email and passport are required.');
  }
  
  const hashedPassword = await User.hashedPassword(password);
  
  const newUser = await User.create({
    email,
    password: hashedPassword
  });
  
  return newUser;
};

module.exports = createUser;