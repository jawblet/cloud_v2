import React from 'react';
import Gradient from './../atoms/Gradient';

export default function Test() {
    return(
        <div className="flex fullHeight justifyCenter alignCenter">
           FUCK!
           <div className="gradient__post">
                <div className="gradient" style={{background:`conic-gradient(snow 30deg, red 90deg, white 300deg)`}}>
                </div>
                <span className="gradient__pin" >
                </span>
            </div>
        </div>
    )
}