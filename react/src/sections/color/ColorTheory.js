import React from 'react';
import Zone from './Zone';
import useDrag from '../../hooks/useDrag';
import useZoneDrop from '../../hooks/house/useZoneDrop';
import ColorKey from './ColorKey';

const ColorTheory = () => {
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
        <>
      <ColorKey handleDragStart={handleDragStart}/>
      {groups && 
        <div className="assignColor">
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
        </div>}
        <hr></hr>
        </>
    );
}
 
export default ColorTheory;