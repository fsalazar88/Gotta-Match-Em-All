const characterController = {};

characterController.getCharacters = async (req, res, next) => {
    let pokemonArray = [];
    res.locals.characters = [];

    while(pokemonArray.length < 8){
        let pokeNum = Math.floor(Math.random()*150 + 1);
        if(pokemonArray.includes(pokeNum)) {
          continue;
        }
        pokemonArray.push(pokeNum);

        await fetch('https://pokeapi.co/api/v2/pokemon/' + pokeNum + '/')
          .then((data) => data.json())
          .then((data) => {
            let pokeImageLink = {src: data.sprites.front_default};
            res.locals.characters.push(pokeImageLink);
          })
          .catch((err) => {
            return next({
              log: 'characterController.getCharacters',
              message: 'error during fetch request',
            })
          })
    }
    return next();

}


module.exports = characterController;