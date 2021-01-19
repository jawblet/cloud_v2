import { useState } from 'react'

export default function useDragDrop() {
    const [dragItem, setDragItem] = useState(null);
    const [draggedOver, setDraggedOver] = useState(null);

    const handleDragStart = (e) => {
        const dragItem = e.currentTarget.id;
        setDragItem(dragItem);
    };
  
    const handleDragOver = (e) => {
        e.preventDefault();
        const draggedOver = e.currentTarget.dataset.id;
        setDraggedOver(draggedOver);
      };

    return {
        handleDragOver, 
        handleDragStart,
        setDraggedOver,
        dragItem, 
        draggedOver
    }
}

/*
    const handleDragEnter = (e) => {
        e.preventDefault();
      };


    const handleDragLeave = (e) => {
          e.preventDefault();
          setDraggedOver(null);
        };
*/