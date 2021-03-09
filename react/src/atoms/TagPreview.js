import React from 'react';

export default function TagPreview({ tag, count, color }) {
    return (
        <div className="tagPreview"> 
            <span className="tagPreview__color" style={{backgroundColor:color}}></span>
           <h4>{tag}  
                {count > 1 
                    ? <span className="lightest"> {count}x</span>
                    : ''}
           </h4> 
        </div>
    )
} 