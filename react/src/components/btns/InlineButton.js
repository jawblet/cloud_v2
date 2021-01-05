import React from 'react'; 

export default function InlineButton (props) { 
    return(
        <h4 className={`inlineBtn ${props.outline ? 'outline' : ''}`}
            type={props.type} onClick={props.handleClick}>
            {props.name} 
        </h4>
    )
} 