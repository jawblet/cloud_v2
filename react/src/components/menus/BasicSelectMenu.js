import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
 
export default function BasicSelectMenu({ items, selectItem, childData, show, revertAll }) {
    const menuRef = useRef(null);
 
    return(
        <CSSTransition in={show} timeout={350} menuRef={menuRef} classNames="fade" unmountOnExit>
        <menu className="basicselect" ref={menuRef}>
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