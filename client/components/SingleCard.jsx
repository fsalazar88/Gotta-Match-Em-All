import React from 'react';

export default function SingleCard({card, handleChoice, flipped, disabled}){

    //disables selected card upon user click
    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }
    }

    return(
        <div className='card'>
            <div className={flipped ? "flipped" : ""}>
                <img className='front' src={card.src} alt="card front"/>
                <img
                    className='back'
                    src={'https://images3.alphacoders.com/677/677583.png'}
                    onClick ={handleClick}
                    alt="card back"
                />
            </div>
        </div>
            
    )
}