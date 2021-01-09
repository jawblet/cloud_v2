import React from 'react';
import useDnD from '../../hooks/useDnD';

const DnDMenu = (props) => {
    const { items, itemArr } = props;
    const { 
        handleDragStart,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        list,
        dragAndDrop } = useDnD(itemArr);
    
    return (
        <div className="accordion">
        {list && list.map((roomArr, col) => {
            return ( 
                <div className="accordion__panel" key={col}>
                    <input type="checkbox" className="accordion__panel__input" id={`panel-${col}`} defaultChecked/>
                    <label className="accordion__panel__label" htmlFor={`panel-${col}`}>
                       <h4> {col} </h4> 
                    </label>
                    <div className="accordion__list">
                        <menu>
                            {roomArr.map((el, i) => {
                            return( <li key={el.id} 
                                        draggable={true}
                                        data-column={col}
                                        data-position={i}
                                        className={`accordion__item dnd 
                                                    ${(dragAndDrop.draggedTo && dragAndDrop.draggedTo.item === el.id ) && 'dnd__drop'}`}
                                        onDragStart={handleDragStart}
                                        onDragOver={handleDragOver}
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}>
                                        {el.label}
                                    </li> )
                                })}
                        </menu>
                    </div>
                </div> );
        })}
    </div>
    )
}
 
export default DnDMenu;