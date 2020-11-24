import React, { forwardRef } from 'react';

const ButtonBar = forwardRef((props, ref) => {
    const btnLength = props.buttons.length; 
    const direction = props.direction;

    const getBtnClass = (i, name) => {
        let position; 
        let active = ''; 
        if(props.type === name) {
            active = 'btnBar--active';
        }

        if(direction === 'column') {
            switch(i) {
                case 0:  position = "btn btnBar btnBar--top" 
                break
                case (btnLength - 1): position = "btn btnBar btnBar--bottom"
                break
                default: position = "btn btnBar"
            }
        } else {
            switch(i) {
                case 0:  position = "btn btnBar btnBar--left" 
                break
                case (btnLength - 1): position = "btn btnBar btnBar--right"
                break
                default: position = "btn btnBar"
        }
    }

        return `btn ${position} ${active}`
    }

    return(
        <div className='btn__bar__wrapper' ref={ref}> 
            <nav className={`btn__bar ${direction}`} onMouseLeave={(e) => props.hideTooltip(e)}>
                {props.buttons.map((button, index) => {
                    return(
                        <button type="button" key={index}
                        className={getBtnClass(index, button.name)} data-id={button.name} 
                        onClick={(e) => props.switchType(e)}
                        onMouseEnter={(e) => props.getTooltip(e)}>
                           {button.icon}
                        </button>
                    )
                })} 
            </nav>  
        </div>  
)
})

export default ButtonBar;

 