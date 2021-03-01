import React from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
 
const SwitchFade = (props) => {          
    return (
        <SwitchTransition mode="out-in">
            <CSSTransition key={props.state}
                        timeout={350} 
                        classNames="fade" 
                        addEndListener={(node, done) => {
                            node.addEventListener("transitionend", 
                                    done, false);
                            }}> 
                    {props.children}
            </CSSTransition>
     </SwitchTransition>
    );
}
 
export default SwitchFade;

