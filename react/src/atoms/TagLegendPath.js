import React, { useRef } from 'react'; 
import { CSSTransition } from 'react-transition-group';
 
export default function TagLegendPath( {coords, tag, enter} ) {
    const nodeRef = useRef(null); 

    return(
        <CSSTransition 
        in={eval(enter)} timeout={350} 
        nodeRef={nodeRef} classNames="fade"
        exit={false}
        unmountOnExit>
            <span ref={nodeRef}>
                <div className="tagPathX" 
                    style={{ backgroundColor:tag.color, 
                            width:`${coords.lengthX - 14.4 - 5}px`,
                            }}>
                </div>
                <div className="tagPathY"
                    style={{ backgroundColor: tag.color, 
                            transform:`translate(${coords.lengthX - 28.8 - 10}px, -100%)`,
                            height: `${coords.heightY - 28}px`,
                            }}>
                </div> 
            </span>
        </CSSTransition>
    )
}

