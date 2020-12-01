import React, { useRef } from 'react'; 
import { CSSTransition } from 'react-transition-group';

export default function CommentInput({ show, value, handleChange }) {
    const nodeRef = useRef(null)

    return (
            <CSSTransition in={show} timeout={700} nodeRef={nodeRef} classNames="rollDown" unmountOnExit>
                <textarea className="input longInput" ref={nodeRef} name="comment" value={value} 
                onChange={handleChange} contentEditable={true} suppressContentEditableWarning={true}/>
            </CSSTransition>
    )
} 