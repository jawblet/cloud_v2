import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function Drawer({ items }) {
    const nodeRef = useRef(null);
    const [menu, setMenu] = useState(false);
 
    return(
        <div className="drawer">
            <h4 className="drawer__tab" onClick={() => setMenu(!menu)}> 
               Labels
            </h4>
              <CSSTransition in={menu} timeout={350} nodeRef={nodeRef} classNames="rollDown" unmountOnExit> 
                <menu className="drawer__dropdown" ref={nodeRef}>
                   
                </menu>
            </CSSTransition>
        </div>
    )
}