import React from 'react';

export default function Tooltip(props) {
    const x = props.tooltipCoords[0];
    const y = props.tooltipCoords[1];

    return (
        <div className="tooltip" style={{top: y, left: x}}>
           <h4> {props.tooltip}</h4>
        </div>
    )
}