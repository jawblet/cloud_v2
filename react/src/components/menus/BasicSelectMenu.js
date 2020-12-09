import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
 
export default function BasicSelectMenu({ items, selectItem, childData, show, toggleMenu }) {
    const nodeRef = useRef(null);

    return(
        <CSSTransition in={show} timeout={350} nodeRef={nodeRef} classNames="fade" unmountOnExit>
        <menu className="basicselect" ref={nodeRef}>
            {items.map(item => {
                return (
                    <li className="selectmenu__item" 
                        key={item} data-id={item} 
                        data-child={childData}
                        onClick={(e) => {
                            selectItem(e)}}>
                        {item}
                    </li>
                    )
                })}
        </menu>
        </CSSTransition>
    )
}