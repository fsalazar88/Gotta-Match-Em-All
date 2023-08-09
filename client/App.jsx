import React, { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard.jsx';
import axios from "axios"

const cardImages = [
    {"src": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", matched: false},
    {"src": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", matched: false},
    {"src": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", matched: false},
    {"src": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png", matched: false},
    {"src": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png", matched: false},
    {"src": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png", matched: false},
    // {"src": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png", matched: false},
    // {"src": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png", matched: false}
]


function App(){
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    //const [urls, setUrls] = useState([{}])
    //const [urls, setUrls] = useState()


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


    const resetTurn= () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    useEffect(() => {
        const fetchUrls = async () => {
            const response = await axios.get("http://localhost:3000/api/sprites");
            // console.log('console.log inside fetchUrls()')
            //console.log(response.data)
            for(let i = 0; i < cardImages.length; i++){
                cardImages[i].src = response.data[i].src;
            }
            //console.log(cardImages)
        }
        fetchUrls()
        // console.log('console.log after fetchUrls()')
        // setTimeout(() => {
        //     for(let i = 0; i < cardImages.length; i++){
        //         cardImages[i].src = urls[i].src;
        //     }
        // }, 500)
        setTimeout(() => shuffleCards(), 700)
    }, [])

    //use this instead of the setTimeout above. This way you iliminate the delay
    // useEffect(() => {
    //     shuffleCards()
    //     console.log("shuffled cards")
    // }, [cardImages])

     
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