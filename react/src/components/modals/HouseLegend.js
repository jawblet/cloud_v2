import React from 'react';
import useHouseLegend from '../../hooks/house/useHouseLegend';

export default function HouseLegend(){
    const { house, boarders } = useHouseLegend(); 
    
    return (
        <div className="houseLegend__wrapper">
            <div className="popup houseLegend">
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
        </div>
    )
}