import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function Drawer({ items, tab }) {
    const nodeRef = useRef(null);
    const [menu, setMenu] = useState(false); 
    return (
        <div className="drawer">
            <h4 className="drawer__tab" onClick={() => setMenu(!menu)}> 
              {tab}
            </h4>
              <CSSTransition in={menu} timeout={350} nodeRef={nodeRef} classNames="openDrawer" unmountOnExit> 
                <menu className="drawer__dropdown" ref={nodeRef}>
                {(items && items.length > 0) 
                        ?   items.map(tag => {
                                return (
                                    <div className="drawer__item" key={tag._id}>
                                       <div className="tagPreview"> 
                                            <span className="tagPreview__color" style={{backgroundColor:tag.color}}></span>
                                            <h4>{tag.tag}</h4> 
                                        </div>
                                    </div>
                                    )
                                })
                        : <p className="fullWidth flex justifyCenter">
                            No paths yet
                            </p>
                    }
                </menu>
            </CSSTransition>
        </div>
    )
}