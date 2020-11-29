import React from 'react'; 

export default function TooltipButton(props) {
    const direction = props.direction; 
    const active = props.type;
    const button = props.button;

    return( 
        <button type="button" key={button.name}
            className={`btn btnBar--${direction} ${active === button.name ? 'btnBar--active' : ''}`} 
            data-id={button.name} onClick={(e) => props.handleClick(e)}
            onMouseEnter={(e) => props.getTooltip(e)}>
                {button.icon}
        </button>
    )
} 