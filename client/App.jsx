import React, { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard.jsx';
import axios from "axios"

/**
 * Initial state of card images.
 * Each card has a 'src' for the image URL and a 'matched' boolean.
 */
const cardImages = [
    {"src": "", matched: false},
    {"src": "", matched: false},
    {"src": "", matched: false},
    {"src": "", matched: false},
    {"src": "", matched: false},
    {"src": "", matched: false},
    {"src": "", matched: false},
    {"src": "", matched: false}
]

/**
 * Retrieve saved high score from local storage.
 */
let savedHighScore = localStorage.getItem('highScore');
console.log('Retrieved High Score:', savedHighScore);

function App(){
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [matches, setMatches] = useState(0);
    const [highScore, setHighScore] = useState(savedHighScore)
    const [isHighlighted, setIsHighlighted] = useState(false);

    /**
     * Fetch card images from the server on initial render.
     * When the request completes, shuffle the cards.
     */
    useEffect(() => {
        const fetchUrls = async () => {
            const response = await axios.get("api/sprites");
            // const response = await axios.get("http://localhost:3000/api/sprites");
            for(let i = 0; i < cardImages.length; i++){
                cardImages[i].src = response.data[i].src;
            }
            shuffleCards();
        }
        fetchUrls()
    }, [])

    /**
     * Shuffle the cards and reset the game state.
     */
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
          .sort(() => Math.random() - 0.5)
          .map((card) => ({...card, id: Math.random()}))
        setCards(shuffledCards)
        setTurns(0)
        setChoiceOne(null)
        setChoiceTwo(null)
        setMatches(0)
    }

    /**
     * Handle the user's card choice.
     * Updates the state for either the first or second choice.
     * @param {Object} card - The selected card object
     */
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    /**
     * Check if the two selected cards match.
     * Updates the game state accordingly.
     */
    useEffect(() => {
        if(choiceTwo && choiceOne){
            setDisabled(true)
            if(choiceOne.src === choiceTwo.src){
                setMatches(matches => matches + 1)
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if(card.src === choiceOne.src){
                            return {...card, matched: true}
                        }
                        else {
                            return card
                        }
                    })
                })
                resetTurn()
            }
            else {
                console.log('You chose two cards that DO NOT match')
                setTimeout(() => resetTurn(), 500)
            }
        }
    },[choiceOne, choiceTwo])

    /**
     * Update the high score if a new one is achieved.
     * Highlights the high score temporarily.
     */
    useEffect(() => {
        if(matches === 8){
            if((turns < highScore && highScore) || !highScore){
                localStorage.setItem('highScore', turns);
                setHighScore(turns)
                setIsHighlighted(true);
                setTimeout(() => setIsHighlighted(false), 1500); // Remove highlight after 1.5 seconds
            } else {
                console.log('You did not set a new high score')
            }
        }
    }, [matches])

    /**
     * Reset the turn state after two cards have been selected.
     */
    const resetTurn= () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    return (
        <div className='App'>
            <h1 id='title' >Gotta Match 'Em All!</h1>
            <button id='newGame' onClick={shuffleCards}>New Game</button>
            <div className='card-grid'>
                {cards.map(card => (
                    <SingleCard
                        key={card.id}
                        card={card} 
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={card.matched || choiceOne == card}
                    />
                ))}
            </div>
            <div id='gameStats' >
                <span id='currentScore' className='scores' >Current Score: {turns}</span>
                {highScore &&
                    <>
                        <span id='scoreSeparator' ></span>
                        <span id='bestScore' className={`scores ${isHighlighted ? 'highlight' : ''}`} >Best Score: {highScore}</span>
                    </>
                }
            </div>
            
        </div>
    )
}

export default App;