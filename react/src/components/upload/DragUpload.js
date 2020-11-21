import React from 'react';
import useDragDrop from './../../hooks/useDragDrop';

export default function DragUpload() {
const { handleDragEnter, 
        handleDragLeave, 
        handleDragOver, 
        handleDrop, 
        data } = useDragDrop(); 

    return(
        <div className={`drag ${data.inDropZone ? "drag--active" : ''}`}
            onDragOver={(e) => handleDragOver(e)}
            onDragEnter={(e) => handleDragEnter(e)} 
            onDragLeave={(e) => handleDragLeave(e)}
            onDrop={(e) => handleDrop(e)} >
            {data.message ? 
            <h4>{data.message}</h4>
            : <h4>drag or click</h4> }
        </div>
    )
}