import React, { useRef } from 'react'; 
import { CSSTransition } from 'react-transition-group';

//for larger tooltips
export default function Tooltip(props) {
    const { text, show, direction, type } = props; 
    const nodeRef = useRef(null);

    return(
         <CSSTransition 
                    in={show} 
                    timeout={150} 
                    nodeRef={nodeRef} 
                    classNames="quickFade"
                    unmountOnExit>
                    <div ref={nodeRef} 
                        className={`tooltip tooltip--${direction} tooltip--${type}`}
                        data-id={props.dataId}>
                        {text}
                    </div>
        </CSSTransition>
    )
}