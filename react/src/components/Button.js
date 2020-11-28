import React from 'react';

export default function Button(props) {
    const button = props.button;
    console.log(props);

    return (
        <button type="button" className={`btn ${button.type}`} onClick={props.handleClick}
        data-id={button.name} onMouseEnter={(e) => props.getTooltip(e)}>
            {button.icon}
        </button>
    )
}