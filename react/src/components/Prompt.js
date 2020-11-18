import React from 'react';

export default function Prompt({type, prompt, handleClick}){
    return(
        <h5 className={`prompt ${type}`} onClick={handleClick}>
            {prompt}
        </h5>
    )
}