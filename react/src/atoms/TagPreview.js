import React from 'react';

export default function TagPreview({ tag }) {
    return (
        <div className="tagPreview" key={tag._id}> 
            <span className="tagPreview__color" style={{backgroundColor:tag.color}}></span>
           <h4>{tag.tag}</h4> 
        </div>
    )
} 