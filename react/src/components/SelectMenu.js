import React, { useState, useEffect, useRef } from 'react';
import { VscChevronDown } from 'react-icons/vsc';
import { CSSTransition } from 'react-transition-group';

export default function SelectMenu({ items, active, selectItem }) {
    const nodeRef = useRef(null);
    const list = items.filter(item => item !== active); 
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        setMenu(false); // close menu on selection 
    }, [active]);
 
    return(
        <div className="selectmenu">
            <h4 className="selectmenu__picked"> 
                {active} 
                <VscChevronDown className="icon icon__btn selectmenu__expand" onClick={() => setMenu(!menu)}/> 
            </h4>
              <CSSTransition in={menu} timeout={700} nodeRef={nodeRef} classNames="rollDown" unmountOnExit> 
                <menu className="selectmenu__dropdown" ref={nodeRef}>
                    {list.map(item => {
                        return (
                            <li className="selectmenu__item" key={item} data-id={item} onClick={(e) => selectItem(e) }>
                                {item}
                            </li>
                        )
                    })}
                </menu>
            </CSSTransition>
        </div>
    )
}