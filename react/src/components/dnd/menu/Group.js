import React, { useState, useRef } from 'react';
import GroupHeader from './GroupHeader';
import DnDList from './DnDList';
import DeleteGroup from './DeleteGroup' 
import { CSSTransition } from 'react-transition-group'; 

const Group = (props) => {
    const nodeRef = useRef(null);
    const { group } = props; 
    const [expand, setExpand] = useState(true); 
    return (
        <div className="group">
         <DeleteGroup {...props} 
            />
            <div className="group__body">
                <GroupHeader group={group} 
                        expand={expand} 
                        setExpand={setExpand} 
                        />
                <CSSTransition in={expand} timeout={350} classNames="grow" nodeRef={nodeRef} 
                        unmountOnExit
                        >
                        <div style={{transformOrigin:'top'}} ref={nodeRef}>
                            <DnDList {...props} 
                            />
                        </div>
                </CSSTransition>
            </div>
        </div>    
    );
}
 
export default Group;


