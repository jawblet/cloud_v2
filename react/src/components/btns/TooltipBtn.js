import React from 'react';

export function TooltipBtn(props) { 
    const { 
        direction, 
        button, 
        tooltips, 
        getTooltip, 
        hideTooltip } = props; 

    return (
        <div className={`tooltipWrapper tooltipWrapper--${direction}`} 
            data-id={button.id}
            data-label={button.name}
            onMouseEnter={getTooltip}
            onMouseLeave={hideTooltip}
            onClick={props.handleClick}
                >
            <button type="button"
                    className="btn"
            >
                {button.icon}
            </button>
            <Tooltip tooltip={button.name}
                     id={button.id}
                     show={tooltips[button.id] || false}
                     direction={direction}
            />
        </div>
    )

}

export function Tooltip(props) {
    const { tooltip, show, direction } = props;

//row style is default for row and solo 
const style = { 
    column: { top: '50%',
        transform: 'translate(4rem, -50%)' },
    row: { left: '50%',
        transform: 'translate(-50%, -5rem)' }
};
    return(
        <>
        {show &&
                <div className="tltp" 
                style={(direction === 'column') ? style.column : style.row}>
                    <h4>{tooltip}</h4> 
                </div>
        }
       </>
    )
}


