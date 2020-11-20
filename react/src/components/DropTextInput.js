import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';


export default function DropTextInput({ show }) {
    const nodeRef = useRef(null)

    return(
        <>
    <CSSTransition in={show} timeout={700} 
                    nodeRef={nodeRef} classNames="rollDown"
                    unmountOnExit>
        <textarea className="input longInput" ref={nodeRef}
                contentEditable={true} suppressContentEditableWarning={true}/>
    </CSSTransition>
        </>
    )
} 