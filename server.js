const express = require('express');
const app = express();
const path = require('path');

const characterController = require('./server/characterController')

// app.get('/', (req, res) => {
//     res.status(200).json({message: 'Hello from the server'});
// })

const sprites = [
    {src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png'},
    {src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/140.png'},
    {src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png'},
    {src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png'},
    {src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png'},
    {src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png'},
    {src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/121.png'},
    {src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/125.png'}
  ];


app.get('/api/sprites',characterController.getCharacters, (req, res) => {
    return res.status(200).send(res.locals.characters);
  });

//   app.get('/styles.css',
//   (req, res) => {
//     return res.status(200).sendFile(path.join(__dirname, './client/styles.css'));
//   });

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '/build')));
// serve index.html on the route '/'
app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '/index.html'));
});
  



app.listen(3000); //listens on port 3000 -> http://localhost:3000/seryt