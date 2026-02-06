const requiredEnvVar = [
  'PORT',
  'JWT_SECRET',
  'MONGO_URI',
  'NODE_ENV'
];

requiredEnvVar.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});