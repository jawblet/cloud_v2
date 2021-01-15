import React, { forwardRef, useRef } from 'react';
import { CSSTransition } from 'react-transition-group'; 
 
const BasicSelectMenu = forwardRef((props, ref) => {
    const nodeRef = useRef(null); 
    const { items, selectItem, childData, show, revertAll, roundTop } = props;

    return(
        <CSSTransition in={show} timeout={350} nodeRef={nodeRef} classNames="fade" unmountOnExit>
        <span ref={nodeRef}> 
            <menu className="basicselect" ref={ref}>
                {items.map(item => {
                    return (
                        <li className={`selectmenu__item 
                                ${roundTop ? 'selectmenu__item--top' : ''}`}
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
        </span>
        </CSSTransition>
    )
});

export default BasicSelectMenu;