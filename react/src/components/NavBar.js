import React, { forwardRef } from 'react'; 
import NavButton from '../atoms/NavButton';
import Button from './Button';

const NavBar = forwardRef((props, ref) => {
    return(
        <div className='btn__bar__wrapper' ref={ref}> 
            <nav className={`${props.direction}`} onMouseLeave={(e) => props.hideTooltip(e)}>
                {props.buttons.map((button, i) => {
                    if(i <= 2) {
                        return ( <NavButton key={i} button={button} {...props} /> )
                    } else {
                        return ( 
                        <Button key={i} button={button} {...props} handleClick={props.handleExpandClick}/> 
                        )
                    }
                    
                })} 
            </nav>  
        </div>  
)
})

export default NavBar;

 