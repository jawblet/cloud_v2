import React from 'react';
import { VscClose } from 'react-icons/vsc';

export default function InboxPreview({ post, plaintext, handleLibraryBookDelete }) {
    console.log(post);
    return(
        <div className="inbox__preview"> 
        <span className="inbox__preview__text">
            <p style={{fontWeight:'bold'}}>{post.title}</p>
            <p>{plaintext}</p>
        </span>
            <VscClose className="icon icon__btn inbox__preview__X" 
                data-id={post._id}
                onClick={handleLibraryBookDelete}/> 
        </div>
    )
}