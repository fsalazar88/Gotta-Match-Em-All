const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

const characterController = require('./api/characterController')

//parse JSON from incoming requests
app.use(express.json());

/**
 * Middleware to set headers for CORS (Cross-Origin Resource Sharing)
 * Allows requests from specified origin
 */
app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // Uncomment for local development
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Allow GET and POST methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, '/dist')));
app.use(express.static(path.join(__dirname, '/client')));

//handle request to backend for new images
app.get('/api/sprites',characterController.getCharacters, (req, res) => {
    return res.status(200).send(res.locals.characters);
  });

//Serve app on the route '/'
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/dist', 'index.html'));
});
  
//Global error handling middleware
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

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});