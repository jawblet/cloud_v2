import React from 'react'; 
import { VscClose } from 'react-icons/vsc';

export default function TagBank({tags, handleDelete}) { 
    return(
        <>
        {tags.length > 0 &&  
               <div className="tagBank">
                {tags.map(tag => {
                    return( <div className="tag tag--edit" key={tag._id || tag} style={{marginBottom:'0.5rem'}}>
                        <h4>{tag.tag || tag}</h4> 
                        <VscClose className="tag__X" onClick={() => handleDelete(tag)}/> 
                    </div>
                    )
                })}
             </div> 
            }
        </>
    )
}