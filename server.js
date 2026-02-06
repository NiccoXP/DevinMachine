require('dotenv').config();
require('./validate.env');
const ENV = process.env;
const express = require('express');
const connectDB = require('./config/db');
const app = express();


// Redis Adapter


// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.post('/api', require('./routes/auth'));
// app.get('/api', require('./routes/chat'));

// Sockets


// ErrorHandler Middleware 
// app.use(errorHandler);

// For Deployment Purpose
if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build/index.html')))
}

connectDB()
.then(() => {
  app.listen(ENV.PORT, () => console.log('Server listening... ❄️'));
});