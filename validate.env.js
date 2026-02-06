const requiredEnvVar = [
  'PORT',
  'JWT_SECRET',
  'MONGO_URI',
  'REDIS_URL',
  'CLOUDINARY_NAME',
  'CLOUDINARY_KEY',
  'CLOUDINARY_SECRET',
  'NODE_ENV',
  'RESEND_API_KEY',
  'EMAIL_FROM',
  'EMAIL_FROM_NAME',
  'CLIENT_URL',
  
];

requiredEnvVar.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});