# Gotta Match 'Em All!

Gotta Match 'Em All! is a fun and interactive memory matching game built with React and Node.js. Players are presented with a grid of cards featuring Pokémon images, and the goal is to find all matching pairs in the fewest possible turns.

**Visit the deployed website at https://gotta-match-em-all.vercel.app/ and see if you can achieve a new best score!**

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [How to play](#how-to-play)
4. [Installation](#installation)
5. [Contributing](#contributing)
6. [License](#license)

## Features

- Interactive memory matching game
- Fetches Pokémon images from the Pokémon API
- Keeps track of the number of turns
- Saves and displays the best score
- Animates new high scores
- Responsive design for optimal viewing on various devices
- Node.js/Express backend to handle fetching new images and serving the application

## Technologies Used

- React: Frontend library for building user interfaces
- Node.js: JavaScript runtime for server-side development
- Express: Web framework for Node.js to handle HTTP requests
- Axios: Promise-based HTTP client for making API requests
- CSS: Styling language for designing the user interface
- Pokémon API: Provides data and images of Pokémon for the game

## How to play

1. Click on the "New Game" button to start a new game.
2. The cards will be shuffled and hidden.
3. Click on two cards to reveal them.
4. If the two cards match, they will stay revealed. If they do not match, they will be flipped back over.
5. The game ends when all of the cards have been matched.

## Installation

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/fsalazar88/Gotta-Match-em-all.git
    cd gotta-match-em-all
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Build the project:

    ```bash
    npm run build
    ```

4. Start the server:

    ```bash
    npm start
    ```

## Contributing

Contributions are welcome! Please open an issue or a pull request if you have any ideas for improvement.

## License

This project is licensed under the MIT License.