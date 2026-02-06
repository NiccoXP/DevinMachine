const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    select: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [6, 'Email must be at least 6 characters long'],
    maxLength: [50, 'Email must not be longer than 50 characters']
  },
});

userSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10)
};

userSchema.methods.isValidPassword = async function(password){
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function(){
  return jwt.sign({ email: this.email }, process.env.JWT_SECRET);
};

module.exports = mongoose.model('user', userSchema);