import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function Tag({ tag, activeFilter, eyedrop }) {
    const nodeRef = useRef(null); 
    console.log(tag);

    return(
        <div className="flex alignCenter" style={{marginBottom:'1rem'}}>
        <div className="tag"
            style={activeFilter.includes('color') ? {backgroundColor: tag.tagObject[0].color} : {}} >
            <h4>{tag.name}</h4>
            <input type="color" className="colorInput" data-id={tag.id} defaultValue={tag.tagObject[0].color} 
            disabled={eyedrop ? false : true}/>
        </div>
            <CSSTransition in={activeFilter.includes('count')} timeout={350} nodeRef={nodeRef} classNames="fade" unmountOnExit>
                    <h4 className="tag__count" ref={nodeRef}>
                        {tag.countEach}
                    </h4> 
            </CSSTransition>
        </div>
    )
}


