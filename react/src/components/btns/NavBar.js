import React from 'react'; 
import { NavLink } from 'react-router-dom';
//import NavButton from './NavButton';
import { TooltipBtn } from './TooltipBtn';
import useTooltipButtons from '../../hooks/useToolTipButtons'; 

const NavBar = (props) => { 
    const { buttons, direction } = props;
    const { tooltips, getTooltip, hideTooltip } = useTooltipButtons(buttons);

    return(
        <nav className={`btnbarWrapper ${direction}`}>
            {buttons.map((btn, i) => {
                return ( 
                    <NavLink to={`/${btn.url}`} className={`navBtn--${direction}`}>  
                        <TooltipBtn 
                            key={btn.id}
                            button={btn} 
                            tooltips={tooltips}
                            getTooltip={getTooltip}
                            hideTooltip={hideTooltip}
                            {...props}
                            />
                        </NavLink>
                            )
                })} 
                {props.squeezeBtn.map((button, i) => {
                    return ( 
                        <TooltipBtn key={button.id} 
                            button={button} 
                            tooltips={tooltips}
                            getTooltip={getTooltip}
                            hideTooltip={hideTooltip}
                            handleClick={props.handleExpandClick}
                            {...props} />
                        )
    })}
        </nav>  
    )
}

export default NavBar;







/*
{props.squeezeBtn.map((button, i) => {
                    return ( 
                        <TooltipButton key={i} 
                        button={button} 
                        handleClick={props.handleExpandClick}
                        {...props} />
                        )
    })}
*/
 