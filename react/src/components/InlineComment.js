import React, { useRef, useEffect } from 'react';
import autosize from 'autosize';

export default function InlineComment(props) {
const commentRef = useRef(null);

    useEffect(() => {
        autosize(commentRef.current);
    }, []);

    return (
        <textarea className="input input--white inlineComment" name="comment" placeholder="Comment..."
        ref={commentRef} 
        contentEditable={true} suppressContentEditableWarning={true} 
        onChange={props.handleChange} 
        value={props.comment}  
        onKeyDown={props.handleKeyDown}
        />
    )
}

