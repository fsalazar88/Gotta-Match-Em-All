import React from 'react';
import PropTypes from 'prop-types';

/**
 * SingleCard Component
 * Represents a single card in the memory game.
 *
 * @param {Object} props - Component props
 * @param {Object} props.card - Card object containing image src and matched status
 * @param {Function} props.handleChoice - Function to handle card selection
 * @param {Boolean} props.flipped - Boolean indicating if the card is flipped
 * @param {Boolean} props.disabled - Boolean indicating if card selection is disabled
 */
export default function SingleCard({card, handleChoice, flipped, disabled}){

    /**
     * Handle card click event.
     * Prevents further clicks if the selection is disabled.
     */
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
                    src={'../img/677583.png'}
                    onClick ={handleClick}
                    alt="card back"
                />
            </div>
        </div>
            
    )
}

// Prop types validation for the SingleCard component
SingleCard.propTypes = {
    card: PropTypes.shape({
        src: PropTypes.string.isRequired,
        matched: PropTypes.bool.isRequired
    }).isRequired,
    handleChoice: PropTypes.func.isRequired,
    flipped: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired
};