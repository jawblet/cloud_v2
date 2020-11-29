import React from 'react'; 
import { NavLink } from 'react-router-dom';

export default function NavButton(props) {
    const direction = props.direction; 
    const button = props.button;

    return( 
        <NavLink to={`/${button.url}`} className={`btn btnBar--${direction}`}>  
            <button type="button" key={button.name}
                data-id={button.name} onMouseEnter={(e) => props.getTooltip(e)}>
                    {button.icon}
            </button>
        </NavLink>
    )
}