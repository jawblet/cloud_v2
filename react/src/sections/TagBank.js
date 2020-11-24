import React from 'react';
import { VscClose } from 'react-icons/vsc';

export default function TagBank({tags, handleDelete}) {
    console.log(tags);
return(
    <div className="flex">
        {tags.map(tag => {
            return(
            <div className="tag tag--edit" key={tag}>
                <h4>{tag}</h4> <VscClose className="tag__X" onClick={() => handleDelete(tag)}/> 
            </div>
            )
        })}
    </div>
    )
}