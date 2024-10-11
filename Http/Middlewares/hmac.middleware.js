import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

export default function authenticateHmac(req, res, next) {
  const { body } = req;
  const { message, hmac, nonce, timestamp } = body;
  
  const serverHmac = generateHmac(message, nonce, timestamp);
  
  if (serverHmac === hmac) {
    next();
  } else {
    res.status(401).send({
      status: 'fail',
      message: 'Unauthorized Signature'
    });
  }
};

function generateHmac(data, nonce, timestamp) {

  const toSign = `${data}:${timestamp}:${nonce}`;

  return crypto
    .createHmac('sha256', process.env.API_TOKEN_HASH)
    .update(toSign)
    .digest('hex');
}

// Client Side Example

/** 
const crypto = require('crypto');
const axios = require('axios');

const secretKey = 'API-private-key'; // Use the same secret key as the server
const timestamp = Date.now();
const nonce = crypto.randomBytes(16).toString('hex');
const message = {
    "folio":"R223-81-233-002",
    "identifier":"ID_01"
  };

const toSign = `${message}:${timestamp}:${nonce}`;
// Generate HMAC signature (HMAC A)
const hmacA = crypto
  .createHmac('sha256', secretKey)
  .update(toSign)
  .digest('hex');

// Send the request to the server with the data and HMAC signature A
    axios.post('http://localhost:3000/api/test', {
    hmac: hmacA,
    timestamp,
    message,
    nonce,
    })
  .then(response => {
    console.log('Server response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
 */