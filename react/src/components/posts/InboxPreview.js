import React from 'react';
import { VscClose } from 'react-icons/vsc';

export default function InboxPreview({ post, plaintext, handleLibraryBookDelete }) {

    return(
        <div className="inbox__preview">
            <p className="inbox__preview__text">{plaintext}</p>
            <VscClose className="icon icon__btn inbox__preview__X" 
                data-id={post._id}
                onClick={handleLibraryBookDelete}/> 
        </div>
    )
}