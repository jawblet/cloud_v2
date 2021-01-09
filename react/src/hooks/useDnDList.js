import { useState } from 'react';

export default function useDnD(items) {
    
const initialDndState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: []
} 

const [dragAndDrop, setDragAndDrop] = useState(initialDndState);
const [list, setList] = useState(items); 

 //default DnD API evts 
    const handleDragStart = e => {
        const pos = Number(e.currentTarget.dataset.position);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: pos,
            isDragging: true,
            originalOrder: list
        });

        // Note: this is only for Firefox. Without it, the DnD won't work.
        e.dataTransfer.setData("text/html", '');
    };
    
    const handleDragOver = e => {
        // not as reliable? 
        e.preventDefault();
        e.stopPropagation(); 
      };

    const handleDragEnter = e => {
        e.preventDefault();

        let newList = dragAndDrop.originalOrder;
        const draggedFrom = dragAndDrop.draggedFrom; 
        const draggedTo = Number(e.currentTarget.dataset.position); 
        const itemDragged = newList[draggedFrom]; 
        const remainingItems = newList.filter((item, i) => i !== draggedFrom);
        
        // update the list 
        newList = [ 
            ...remainingItems.slice(0, draggedTo),
            itemDragged,
            ...remainingItems.slice(draggedTo)
        ];
        
        setDragAndDrop({
            ...dragAndDrop,
            updatedOrder: newList, 
            draggedTo: draggedTo
        });
      };
    
    const handleDragLeave = e => {
        e.preventDefault();

        setDragAndDrop({
            ...dragAndDrop,
            draggedTo: null
           });
      };

      const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        setList(dragAndDrop.updatedOrder);
        setDragAndDrop({ ...dragAndDrop,
            draggedFrom: null,
            draggedTo: null,
            isDragging: false });
      };
    
    return {
        handleDragStart,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        list, 
        dragAndDrop
    }
}