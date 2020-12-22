import React, { forwardRef } from 'react'; 
import NavButton from './NavButton';
import TooltipButton from './TooltipButton';

const NavBar = forwardRef((props, ref) => {
    return(
        <div className='btn__bar__wrapper' ref={ref}> 
            <nav className={`${props.direction}`} onMouseLeave={(e) => props.hideTooltip(e)}>
                {props.navButtons.map((button, i) => {
                        return ( 
                            <NavButton key={i} button={button} {...props} />
                            )
                })} 
                {props.squeezeBtn.map((button, i) => {
                    return ( 
                        <TooltipButton key={i} button={button} {...props} handleClick={props.handleExpandClick}/>
                        )
                })}
            </nav>  
        </div>  
)
})

export default NavBar;

 