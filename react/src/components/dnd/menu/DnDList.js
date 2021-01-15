import React from 'react';
import { Link } from 'react-router-dom';
import { Droppable, Draggable } from "react-beautiful-dnd";

const DnDList = (props) => {
    const { listType, listId, row } = props;

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
                {row.layers.map((layer, index) => (
                <Draggable  draggableId={layer.id} 
                            key={layer.id} 
                            index={index}>
                    {dragProvided => (
                        <div
                            {...dragProvided.dragHandleProps}
                            {...dragProvided.draggableProps}
                            ref={dragProvided.innerRef} 
                        >
                            <Link to={`/${layer.slug}`}>
                                <p className={`dnd__item 
                                 ${row.id !== 'ungrouped' ? 'dnd__item--nested' : ''}
                                `}
                                > 
                                    {layer.label}
                                </p>
                            </Link>
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

