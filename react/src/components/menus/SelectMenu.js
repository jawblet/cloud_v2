import React, { useState, useRef } from 'react';
import { VscChevronDown } from 'react-icons/vsc';
import { CSSTransition } from 'react-transition-group'; 

export default function SelectMenu({ items, active, selectItem }) { 
    const nodeRef = useRef(null);
    const list = items.filter(item => item.label !== active); 
    const [menu, setMenu] = useState(false);
 
    return( 
        <div className="selectmenu">
            <h4 className="selectmenu__picked" onClick={() => setMenu(!menu)}> 
                {active} 
                <VscChevronDown className="icon icon__btn selectmenu__expand"/> 
            </h4> 
              <CSSTransition in={menu} timeout={700} nodeRef={nodeRef} classNames="rollDown" unmountOnExit> 
                <menu className="selectmenu__dropdown" ref={nodeRef}>
                    {list.map(item => {
                        return (
                            <li className="selectmenu__item" key={item.id} data-id={item.id} onClick={(e) => selectItem(e) }>
                                {item.label}
                            </li>
                        )
                    })}
                </menu>
            </CSSTransition> 
        </div>
    )
}