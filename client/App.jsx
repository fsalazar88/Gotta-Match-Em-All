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


function App(){
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)


    //function shuffles cards and resets board
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
          .sort(() => Math.random() - 0.5)
          .map((card) => ({...card, id: Math.random()}))
        
        setCards(shuffledCards)
        setTurns(0)
        setChoiceOne(null)
        setChoiceTwo(null)
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

    //function that resets user choices to null after two cards have been selected
        //turs state is incremented by one selected cards are turned back over
    const resetTurn= () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    //when page loads, a request is sent to retrieve new images from API
        //when request completes, cards are shuffled
    useEffect(() => {
        const fetchUrls = async () => {
            const response = await axios.get("http://localhost:3000/api/sprites");
            for(let i = 0; i < cardImages.length; i++){
                cardImages[i].src = response.data[i].src;
            }
            shuffleCards();
        }
        fetchUrls()
    }, [])


    return (
        <div className='App'>
            <h1>Gotta Match 'Em All!</h1>
            <button onClick={shuffleCards}>New Game</button>
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
            <p>Turns: {turns}</p>
        </div>
    )
    
}

export default App;