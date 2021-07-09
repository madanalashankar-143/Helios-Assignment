

var env = process.env.NODE_ENV || 'development';

var config = require('./config.json');

var envConfig = config[env];

Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);


//"MONGODB_URL": "mongodb://localhost:27017/heliosTechnicalAssignment",