import React from 'react';

const outline = {
    filter: `url(#outline)` 
}

const goo = {
    filter: `url(#goo)` 
}


export const Blob1 = () => {
    return(
            <span className="circle" id="c1a" style={goo}></span>
    )
}

export const Blob2 = () => {
    return(
        <div className="contour1"
            //style={style}
        >
            <span className="circle" id="c2"></span>
        </div>
    )
}


