import React from 'react';

export const Grid = () => {
    const column = 8;
    const row = 5; 
    const gridArr = [...Array(column * row)];

    return (
        <div className="grid">
            {gridArr.map((el, i) => {
                return(
                    <>
                    <div className="grid__cell" key={i}>
                    </div>
                    </>
                )
            })}
        </div>
    )
}
