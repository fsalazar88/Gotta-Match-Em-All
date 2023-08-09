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
app.use(express.static(path.join(__dirname, '../dist'))); // NEW
app.use(express.static(path.join(__dirname, '../client'))); // NEW


app.get('/api/sprites',characterController.getCharacters, (req, res) => {
    return res.status(200).send(res.locals.characters);
  });


// Serve app on the route '/'
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../dist', 'index.html')); // EDIT
});
  

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});