import React from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";
import DragItem from './DragItem';

const DnDList = (props) => {
    const { listType, listId, group, layers } = props;

    return (
    <Droppable style={{ transform: "none" }}
        droppableId={listId}
        type={listType}
        direction="vertical"
        isCombineEnabled={false}
        >
        {dropProvided => (
        <div 
            className="dnd__list"
            {...dropProvided.droppableProps}
            ref={dropProvided.innerRef}
                > 
                {layers.map((layer, index) => (
                <Draggable  draggableId={layer.id} 
                            key={layer.id} 
                            index={index}>
                    {dragProvided => (
                        <div
                            {...dragProvided.dragHandleProps}
                            {...dragProvided.draggableProps}
                            ref={dragProvided.innerRef} 
                        >
                           <DragItem layer={layer} group={group}/>
                        </div>
                    )}
                </Draggable>
                ))}
                {dropProvided.placeholder}
            </div>
        )}
    </Droppable>);
}
 
export default DnDList;

