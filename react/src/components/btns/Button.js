import React from 'react';

export default function Button(props) {
    return (
        <button type="button" className={`btn ${props.type}`} onClick={props.handleClick}>
            {props.icon}
        </button>
    )
}