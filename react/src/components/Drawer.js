import React, { useState, useRef } from 'react';
import TagPreview from '../atoms/TagPreview';
import { CSSTransition } from 'react-transition-group';

export default function Drawer({ items }) {
    const nodeRef = useRef(null);
    const [menu, setMenu] = useState(false);
    return (
        <div className="drawer">
            <h4 className="drawer__tab" onClick={() => setMenu(!menu)}> 
               house labels
            </h4>
              <CSSTransition in={menu} timeout={350} nodeRef={nodeRef} classNames="openDrawer" unmountOnExit> 
                <menu className="drawer__dropdown" ref={nodeRef}>
                {(items && items.length > 0)
                        ?   items.map(tag => {
                                return (
                                    <div className="drawer__item" key={tag._id}>
                                        <TagPreview tag={tag}/>
                                    </div>
                                    )
                                })
                        : <p>No tags yet</p>
                    }
                </menu>
            </CSSTransition>
        </div>
    )
}