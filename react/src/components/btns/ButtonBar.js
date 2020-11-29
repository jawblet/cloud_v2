import React, { forwardRef } from 'react'; 
import TooltipButton from './TooltipButton';

const ButtonBar = forwardRef((props, ref) => {
  
    return(
        <div className='btn__bar__wrapper' ref={ref}> 
            <nav className={`${props.direction}`} onMouseLeave={(e) => props.hideTooltip(e)}>
                {props.buttons.map(button => {
                    return(
                        <TooltipButton key={button.name} button={button} {...props} />
                    )
                })} 
            </nav>  
        </div>  
)
})

export default ButtonBar;

 