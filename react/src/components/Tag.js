import React from 'react';

export default function Tag({ tag, activeFilter }) {
    return(
        <div className="tag"
            style={activeFilter.includes('color') ? {backgroundColor: tag.color} : {}} >
            <h4>{tag.tag}</h4>
        </div>
    )
}