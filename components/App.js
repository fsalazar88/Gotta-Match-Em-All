import React, { Component, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import SingleCard from './SingleCard';
import '/components/App.css'
import '/components/SingleCard.js'

const cardImages = [
    {"src": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", matched: false},
    {"src": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", matched: false},
    {"src": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", matched: false},
    {"src": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png", matched: false},
    {"src": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png", matched: false},
    {"src": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png", matched: false},
    {"src": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png", matched: false},
    {"src": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png", matched: false}
]

const whosThatPokemonURL = 'https://images3.alphacoders.com/677/677583.png';
const testPokemonURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png';


function App(){
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
          .sort(() => Math.random() - 0.5)
          .map((card) => ({...card, id: Math.random()}))
        
        setCards(shuffledCards)
        setTurns(0)
        setChoiceOne(null)
        setChoiceTwo(null)
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    useEffect(() => {
        if(choiceTwo && choiceOne){
            if(choiceOne.src === choiceTwo.src){
                setDisabled(true)
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if(card.src === choiceOne.src){
                            return {...card, matched: true}
                        }
                        else return card
                    })
                })
                //setTimeout(() => resetTurn(), 1000)
                resetTurn()

            }
            else {
                console.log('You chose two cards that DO NOT match')
                setTimeout(() => resetTurn(), 500)
            }
        }
    },[choiceOne, choiceTwo])

    console.log(cards)

    const resetTurn= () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    useEffect(() =>{
        shuffleCards()
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