


const characterController = {};

characterController.getCharacters = (req, res, next) => {
    let pokemonArray = [];
    res.locals.characters = [];
    let array = [];

    while(pokemonArray.length < 8){
        let pokeNum = Math.floor(Math.random()*150 + 1);
        if(pokemonArray.includes(pokeNum)) continue;
        pokemonArray.push(pokeNum);

        fetch('https://pokeapi.co/api/v2/pokemon/' + pokeNum + '/')
          .then((data) => data.json())
          .then((data) => {
            //let obj = {data: data.name, url: data.sprites.front_default};
           //fs.writeFileSync('/database.txt', data.name);
          //  fs.appendFile("books.txt", data.name, (err) => {
          //   if (err)
          //     console.log(err);
          //   else {
          //     console.log("File written successfully\n");
          //     console.log("The written has the following contents:");
          //     console.log(fs.readFileSync("books.txt", "utf8"));
          //   }
          //   });
            //console.log('returned data: ' + data);
            // let obj = {type: data.name, image: data.sprites.front_default};
            let obj = {src: data.sprites.front_default};
            //addToLocals(data);
            //array.push(data.name);
            // console.log('data.name = ' + data.name);
            // console.log(obj);
            res.locals.characters.push(obj);
            //console.log(res.locals.characters)
            if(res.locals.characters.length >=8){
                console.log(res.locals.characters)
                //fs.writeFile("database.txt", res.locals.characters);
                
                return next();
            }
          })
          .catch((err) => {
            return next({
              log: 'characterController.getCharacters',
              message: 'error during fetch request',
            })
          })
    }

    // const addToLocals = data => {
    //     //console.log('data inside addToLocals = ' + data.name);
    //     let newArray = [];
    //     newArray.push(data.name);
    //     console.log(data.name);
    //     res.locals.newArray = newArray;
    // }
    //console.log(res.locals);
   // console.log('array = ' + array);
    // console.log('res.locals.characters: ' + res.locals.characters);
    // return next();
}

module.exports = characterController;