import React, { useState } from 'react';

const Zone = ({ empty, 
                group, 
                handleDragOver,
                handleDrop, 
                draggedOver, 
                setDraggedOver,
                dragItem }) => {

    const [zone, setZone] = useState(group.zone);

    return (
        <figure className="assignColor__group">
        <div className={`key__color ${empty ? 'key__color--empty' : ""}
                ${group.id === draggedOver ? 'key__color--active' : "" }
                `} 
            id={zone}
            data-id={group.id}
            onDragOver={handleDragOver} 
            onDragLeave={(e) => {
                e.preventDefault();
                setDraggedOver(null);
                }}
            onDrop={() =>  { 
                        setDraggedOver(null)
                        setZone(dragItem)
                        handleDrop(draggedOver, dragItem) }
                    }>
        </div>
        <figcaption className="assignColor__caption">
            {group.label}
        </figcaption>
    </figure>
    );
}
 
export default Zone;