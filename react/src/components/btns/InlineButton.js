import React from 'react'; 

export default function InlineButton (props) { 
    return(
        <h4 className='btn CTA inline'
            type={props.type} onClick={props.handleClick}>
            {props.name} 
        </h4>
    )
} 