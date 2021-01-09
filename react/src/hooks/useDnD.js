import { useState, useEffect } from 'react';

export default function useDnD(itemArr) {

const initialDndState = {
    draggedFrom: { col: "", item: "" },
    draggedTo: { col: "", item: "" },
    isDragging: false,
    originalOrder: [],
    updatedOrder: []
} 

const [dragAndDrop, setDragAndDrop] = useState(initialDndState);
const [list, setList] = useState(itemArr); 

 //default DnD API evts 
    const handleDragStart = e => {
        const col = Number(e.currentTarget.dataset.column);
        const item = Number(e.currentTarget.dataset.position);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: { col: col, item: item },
            isDragging: true,
            originalOrder: list
        });  

        // Note: this is only for Firefox. Without it, the DnD won't work.
        e.dataTransfer.setData("text/html", '');
    };
    
    const handleDragOver = e => {
        //fires once // not as reliable? 
        e.preventDefault();
        e.stopPropagation();
      };

    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
        const dropCol = Number(e.currentTarget.dataset.column); 
        const dropId = Number(e.currentTarget.dataset.position); 
        const draggedFromCol = dragAndDrop.draggedFrom.col;
        const dragId = dragAndDrop.draggedFrom.item;
        let listCopy = dragAndDrop.originalOrder; 
        //let listCopy = [...list]
        //check that dragged to item id !== dragged from item id
        
        if(dragId !== dropId) {
            let dragList = listCopy[draggedFromCol];
            const remainingDragList = dragList.filter((item, i) => i !== dragId );
            const draggedItem = dragList.find((item, i) => i === dragId );
            console.log(remainingDragList);
            console.log(draggedItem);

            if(draggedFromCol === dropCol) {
                dragList = [
                    ...remainingDragList.slice(0, dropId),
                    draggedItem,
                    ...remainingDragList.slice(dropId)
                ];
        
                listCopy[dropCol] = dragList;
                console.log(dragList);
                setDragAndDrop({
                    ...dragAndDrop,
                    updatedOrder: listCopy, 
                    draggedTo: { col: dropCol, item: dropId }
                });
    
            } else {
                console.log('no');
            }
        } return;        
    }
     
    const handleDragLeave = e => {
        e.preventDefault();
        
        setDragAndDrop({
            ...dragAndDrop,
           // draggedTo: null
           });
      };

      const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
    /*
        setList(dragAndDrop.updatedOrder);
        setDragAndDrop({ ...dragAndDrop,
           // draggedFrom: null,
           // draggedTo: null,
            isDragging: false });    
    */ 
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

        /*
        //check if draglist == drop list 
        if(draggedFromCol === dropCol) {
            // if it does, alter drag list + set state 
            dragList = [
                ...remainingDragList.slice(0, dragId),
                draggedItem,
                ...remainingDragList.slice(dragId)
            ];

            listCopy[draggedFromCol].layers = dragList; //change array to new one 
            setDragAndDrop({
                ...dragAndDrop,
                updatedOrder: listCopy, 
                draggedTo: {colId: dropCol, itemId: dropId}
            });
        }
        
    */