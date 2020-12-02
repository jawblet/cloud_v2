import React from 'react';

export default function Button(props) {


    return (
        <button type="button" className={`btn ${props.active ? 'active' : ''}`} onClick={props.handleClick}
                data-id={props.dataId}>
            {props.icon}
        </button>
    )
}