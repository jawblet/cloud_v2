import React from 'react'; 

export default function FormInput(props) {
    const fail = props.fail; 
    const white = props.white;
 
    return(
        <>
            <input type={props.type} name="input" 
            className={`input
                ${white ? 'input--white' : ''} 
                ${fail ? "input--fail" : ''} `}
            placeholder={props.placeholder}
            disabled={props.disabled}
            name={props.name}
            value={props.value}
            onChange={props.handleChange}
            onKeyDown={props.handleKeyDown} 
            />
        </>
    )
}