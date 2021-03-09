import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';


const Fade = (props) => {

    const nodeRef = useRef(null);
    return (
        <CSSTransition in={props.in} 
                        timeout={props.short ? 150 : 350} 
                        nodeRef={nodeRef} 
                        classNames="fade"
                        exit = {props.exit} 
                        unmountOnExit>
                <span ref={nodeRef}>
                    {props.children}
                </span>
        </CSSTransition>
    );
}
 
export default Fade;