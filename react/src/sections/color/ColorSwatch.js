import React from 'react';

const ColorSwatch = (props) => {
    return (
    <td className="key__cell">
        <div className="key__color" 
            id={props.el.zone}
            draggable={true}
            onDragStart={props.handleDragStart}
            >
        </div>
    </td>
);
}
 
export default ColorSwatch;