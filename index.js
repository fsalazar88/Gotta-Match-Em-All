const express = require('express');
const path = require('path');
const characterController = require('./api/characterController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON from incoming requests
app.use(express.json());


/**
 * Middleware to set headers for CORS (Cross-Origin Resource Sharing).
 * This allows requests from the specified origin (http://localhost:8080).
 * In production, commment out 'Access-Control-Allow-Origin'
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV==='development' ? 'http://localhost:8080': ''); // Dynamically set CORS headers based on the environment
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Allow GET and POST methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
  next();
});

// Middleware to serve static files from 'dist' and 'client' directories
app.use(express.static(path.join(__dirname, '/dist')));
app.use(express.static(path.join(__dirname, '/client')));

/**
 * Route to handle requests for new character images.
 * Uses characterController to fetch character data.
 */
app.get('/api/sprites',characterController.getCharacters, (req, res) => {
    return res.status(200).send(res.locals.characters); // Send character data as response
  });

/**
 * Route to serve the main application.
 * Serves the 'index.html' file from the 'dist' directory.
 */
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/dist', 'index.html'));
});
  
/**
 * Global error handling middleware.
 * Catches and handles errors throughout the application.
 */
app.use((err, req, res, next) => {
  const defaultErr = {
      log: 'Express error handler caught unknown middlware error',
      status: 400,
      message: { err: 'Error occured' }
  }; 
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});