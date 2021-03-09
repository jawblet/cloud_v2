import React from 'react'; 
import { NavLink } from 'react-router-dom';
import Button from './Button';
import { ZOOM_IN_BTN, ZOOM_OUT_BTN } from '../../data/buttons';
import { TooltipBtn } from './TooltipBtn';
import useTooltipButtons from '../../hooks/useToolTipButtons'; 
 
const NavBar = (props) => { 
    const { buttons, direction, zoomIn, setZoom } = props;
    const { tooltips, getTooltip, hideTooltip } = useTooltipButtons(buttons);

    return(
        <div className="nav__wrapper">
          {zoomIn ? 
            <Button icon={ZOOM_OUT_BTN.icon} dataId={ZOOM_OUT_BTN.dataId} handleClick={() => setZoom(!zoomIn)}/> 
           : <Button icon={ZOOM_IN_BTN.icon} dataId={ZOOM_IN_BTN.dataId} handleClick={() => setZoom(!zoomIn)}/> }
        <nav className={`btnbarWrapper ${direction}`}>
            {buttons.map((btn, i) => {
                return ( 
                    <NavLink to={`/${btn.url}`} className={`navBtn--${direction}`}  key={btn.id}>  
                        <TooltipBtn 
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
        </div>
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
 