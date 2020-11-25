import React from 'react';

export default function SelectMenu(props) {
    return(
        <div className="selectmenu">
            <h4 className="selectmenu__picked">{props.active}</h4>
            <menu className="selectmenu">
            </menu>
        </div>
    )
}