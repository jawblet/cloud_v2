import React, { useRef } from 'react'; 
import { CSSTransition } from 'react-transition-group';

//for larger tooltips
export default function Tooltip(props) {
    const { text, show } = props; 
    const tooltipRef = useRef(null);
    console.log(props);

    return(
        <>
         <CSSTransition 
                    in={show} 
                    timeout={150} 
                    tooltipRef={tooltipRef} 
                    classNames="quickFade"
                    unmountOnExit>
                    <div className="tooltip" ref={tooltipRef}>
                        {text}
                    </div>
        </CSSTransition>
        </>
    )
}