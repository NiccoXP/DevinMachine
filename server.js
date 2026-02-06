require('dotenv').config();
require('./validate.env');
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const app = express();


// Redis Adapter


// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', require('./routes/auth'));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server working...'
  })
});

// Sockets


// ErrorHandler Middleware 
// app.use(errorHandler);

// For Deployment Purpose
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build/index.html')))
}

connectDB()
.then(() => {
  app.listen(process.env.PORT, () => console.log('Server listening... ❄️'));
});