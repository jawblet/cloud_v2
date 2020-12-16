import React from 'react';
import useHouse from '../../hooks/useHouse';

export default function HouseLegend() {

    const { house, boarders } = useHouse();

    return (
        <div className="popup" style={{boxShadow:'none'}}>
            <div className="popup__header">
                <h4 className="lightest">{house}</h4> 
            </div>
                 <div className="popup__body">
                     {boarders && boarders.map(boarder => {
                         return(
                            <p className="light" key={boarder}>
                                @{boarder} 
                            </p> 
                         )
                     })}
            </div>
        </div>
    )
}