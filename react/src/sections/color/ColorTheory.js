import React, { useContext } from 'react';
import Zone from './Zone';
import useDrag from '../../hooks/useDrag';
import useZoneDrop from '../../hooks/house/useZoneDrop';
import ColorKey from './ColorKey';
import { UserContext } from '../../hooks/UserContext'

const ColorTheory = () => {
    const { user } = useContext(UserContext);
    const house = user.house.house;

    const { 
        handleDragOver, 
        handleDragStart,
        setDraggedOver,
        dragItem, 
        draggedOver } = useDrag(); 

    const { 
        handleDrop, 
        groups
    } = useZoneDrop();

    return (
    <div className="colorKey"> 
      <ColorKey handleDragStart={handleDragStart}/>
      <hr></hr>
      {groups && 
        <div className="assignColor">
            <h4 className="houseTitle">{house}'s zones</h4>
            <div className="assignColor__zones">
            {groups.map(group => {
                return <Zone key={group.id} 
                            group={group} 
                            setDraggedOver={setDraggedOver}
                            handleDragOver={handleDragOver} 
                            draggedOver={draggedOver}
                            dragItem={dragItem}
                            handleDrop={handleDrop}
                            empty={(group.zone === '')}
                            />
                    })}
                </div>
            </div>}
        </div>
    );
}
 
export default ColorTheory;