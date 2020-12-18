import React from 'react';
import useHouse from '../../hooks/useHouse';

export default function HouseLegend(){
    const { house, boarders } = useHouse();
    
    return (
        <div className="popup" style={{boxShadow:'none'}}>
            {boarders && 
            <>
                <div className="popup__header">
                    <h4 className="lightest">{house}</h4> 
                </div>
                        {boarders.map(boarder => {
                            return(
                            <h4 className="light popup__item" key={boarder}>
                                @{boarder} 
                            </h4> 
                        )
                    })}
            </>}
        </div>
    )
}