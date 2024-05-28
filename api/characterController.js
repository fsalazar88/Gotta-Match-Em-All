const characterController = {};

/**
 * Middleware to retrieve 8 unique Pokémon images/sprites from the Pokémon API.
 * The array containing image URLs is saved to the response object.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware next function
 * 
 * @returns {Function} Calls next middleware function
 */
characterController.getCharacters = async (req, res, next) => {
    let pokemonSprites = new Set();
    res.locals.characters = [];

    try {
        while(pokemonSprites.size < 8){
            let pokeNum = Math.floor(Math.random()*151 + 1); // Generate a random number between 1 and 151
            if(pokemonSprites.has(pokeNum)) {
              continue; // Skip if Pokémon number is already included
            }
            pokemonSprites.add(pokeNum);

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}/`);
            const data = await response.json();
    
            // Push the Pokémon image link to the character array
            res.locals.characters.push({src: data.sprites.front_default});
        }
        return next(); // Proceed to the next middleware
    } catch (err) {
        return next({
            log: `characterController.getCharacters: ${err}`,
            message: {error: 'Error during fetch request'},
        });
    }
};

module.exports = characterController;