import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group'; 

const Rolldown = (props) => {
    const nodeRef = useRef(null);

    return (
        <CSSTransition in={props.in} 
                timeout={350} 
                nodeRef={nodeRef} 
                classNames="grow" 
                unmountOnExit> 
            <span ref={nodeRef}>
                {props.children} 
            </span>
        </CSSTransition>

    );
}
 
export default Rolldown;