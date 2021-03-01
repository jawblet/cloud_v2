import React from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
 
const SwitchSlide = (props) => {          
    return (
        <SwitchTransition mode="out-in">
            <CSSTransition key={props.state}
                        timeout={350} 
                        classNames="rollOutX" 
                        addEndListener={(node, done) => {
                            node.addEventListener("transitionend", 
                                    done, false);
                            }}> 
                    {props.children}
            </CSSTransition>
     </SwitchTransition>
    );
}
 
export default SwitchSlide;

