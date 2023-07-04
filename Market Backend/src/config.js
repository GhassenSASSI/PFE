const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const generateSecretKey = () => {
  return crypto.randomBytes(64).toString('hex');
};

const secretKey = generateSecretKey();

// Define the other configuration values
const serverPort = 3000;
const dbHost = 'localhost';
const dbPort = 27017;
const dbName = 'ghassendb';
const mongodbUri = `mongodb://${dbHost}:${dbPort}/${dbName}`;
const jwtExpiresIn = 108000;

// Create the content for the .env file
const envContent = `# Server Configuration
PORT=${serverPort}

# Database Configuration
DB_HOST=${dbHost}
DB_PORT=${dbPort}
DB_NAME=${dbName}
MONGODB_URI=${mongodbUri}

# JWT Configuration
JWT_SECRET=${secretKey}
JWT_EXPIRES_IN=${jwtExpiresIn}`;

// Write the content to the .env file
const envFilePath = path.resolve(__dirname, '../.env');
fs.writeFileSync(envFilePath, envContent);

// Load the environment variables from the .env file
require('dotenv').config({ path: envFilePath });