const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

const characterController = require('./characterController')

//parse JSON from incoming requests
app.use(express.json());

// deal with cors headers
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Serve static files
// app.use(express.static(path.join(__dirname, '../dist')));
// app.use(express.static(path.join(__dirname, '../client')));
app.get('/', (req, res) => {
  return res.send('Server is running');
});

//handle request to backend for new images
app.get('/api/sprites',characterController.getCharacters, (req, res) => {
    return res.status(200).send(res.locals.characters);
  });


// Serve app on the route '/'
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../dist', 'index.html'));
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