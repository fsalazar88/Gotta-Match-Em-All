import React, { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard.jsx';
import axios from "axios"

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


    //when page loads, a request is sent to retrieve new images from API
        //when request completes, cards are shuffled
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

    //function shuffles cards and resets board
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

    //upadted choice one and two states when user clicks on cards
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    //after user has selected two cards, check if cards match
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

    useEffect(() => {
        if(matches === 8){
            if((turns < highScore && highScore) || !highScore){
                localStorage.setItem('highScore', turns);
                setHighScore(turns)
            } else {
                console.log('You did not set a new high score')
            }
        }
    }, [matches])

    //function that resets user choices to null after two cards have been selected
        //turs state is incremented by one selected cards are turned back over
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
                        disabled={disabled}
                    />
                ))}
            </div>
            <div id='gameStats'>
                <p id='currentScore' className='scores' >Current Score: {turns}</p>
                {highScore &&
                    <>
                        <p id='scoreSeparator'></p>
                        <p id='bestScore' className='scores' >Best Score: {highScore}</p>
                    </>
                }
            </div>
        </div>
    )
}

export default App;