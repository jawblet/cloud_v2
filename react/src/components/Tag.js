import React from 'react';

export default function Tag({ tag, activeFilter, eyedrop }) {
    console.log(eyedrop);
    return(
        <div className="tag"
            style={activeFilter.includes('color') ? {backgroundColor: tag.color} : {}} >
            <h4>{tag.tag}</h4>
            <input type="color" className="colorInput" data-id={tag.id} defaultValue={tag.color} 
            disabled={eyedrop ? false : true}/>
        </div>
    )
}