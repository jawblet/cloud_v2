import React from 'react'; 
import { VscClose } from 'react-icons/vsc';

export default function InboxPreview({ post, plaintext, props }) {
    const { handleLibraryBookDelete } = props;
    
    return(
            <div className="inboxPreview"> 
                <div className="inboxPreview__text">
                    <p className="inboxPreview__subject">{post.title}</p>
                    <p className="inboxPreview__body">{plaintext}</p>
                    <div className="inboxPreview__fade"></div>
                </div>
                    <VscClose className="icon icon__btn inboxPreview__X" 
                        data-id={post._id}
                        onClick={(e) => {
                            e.preventDefault();
                            handleLibraryBookDelete(e)}}/> 
            </div>
    )
} 