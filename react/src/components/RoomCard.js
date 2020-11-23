import React from 'react'; 

export default function Card({room, squeeze, getPositionClass, handleCardClick}) {
    return(
        <div className={`card 
                    ${squeeze ? room : ''} 
                    ${squeeze ? getPositionClass(room) : ''}`} 
        key={room} data-id={room} onClick={(e) => handleCardClick(e)}>
            <h4 className={`card__label ${room}`}>
                {room}
            </h4>
        </div>
    )
}