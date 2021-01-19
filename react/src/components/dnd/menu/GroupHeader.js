import React from 'react';
import Chevron from '../../../atoms/Chevron'; 
import GroupLabel from './GroupLabel';
import LayerLabel from './LayerLabel';
import useRenameGroup from '../../../hooks/layers/useRenameGroup';
import useDetectClickOut from '../../../hooks/useDetectClickOut';

const GroupHeader = ({ group, expand, setExpand }) => {
   
    const {  handleBlur, newName, handleChange } = useRenameGroup(group);
    const { disable, setDisable, nodeRef } = useDetectClickOut(true);
    
    return (
        <div className="dndHeader">
        {group.id !== "ungrouped" 
            ?
            <GroupLabel group={group} 
                    disable={disable} 
                    handleClick={(e) => { e.preventDefault(); setDisable(false)}}
                    handleBlur={(e) => { handleBlur(e); setDisable(true); }}
                    newName={newName}
                    handleChange={handleChange}
                    nodeRef={nodeRef}
                    />
            : <LayerLabel group={group}/>
            }
        <Chevron expand={expand} setExpand={setExpand}
            />
        </div>      
    );
}
 
export default GroupHeader; 


