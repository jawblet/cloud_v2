import React from 'react'; 
import { Link } from 'react-router-dom'; 
 
export default function Card({room, squeeze, getPositionClass, handleCardClick}) {
    return(
        <div className={`card 
                    ${squeeze ? room : ''} 
                    ${squeeze ? getPositionClass(room) : ''}`} 
        key={room} data-id={room} onClick={(e) => handleCardClick(e)}>
 
            <Link className={`card__label ${room}`} to={`/${room}`}>
                <h4>
                    {room}
                </h4>
            </Link>
        </div>
    )
}