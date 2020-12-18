import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
 
export default function BasicSelectMenu({ items, selectItem, childData, show, revertAll }) {
    const nodeRef = useRef(null);
 
    return(
        <CSSTransition in={show} timeout={350} nodeRef={nodeRef} classNames="fade" unmountOnExit>
        <menu className="basicselect" ref={nodeRef}>
            {items.map(item => {
                return (
                    <li className="selectmenu__item" 
                        key={item} data-label={item} // need for reading what is selected  
                        data-id={childData} // need for passing data from posts
                        onClick={(e) => {
                            revertAll()
                            selectItem(e)}}> 
                        {item}
                    </li>
                    )
                })}
        </menu>
        </CSSTransition>
    )
}