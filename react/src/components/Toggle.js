import React from 'react';

export default function Toggle({toggleState, handleToggle, label}) {
    let active;
    active = toggleState ? 'on' : '';
    return(
        <div className="toggle__wrapper">
            <div className={`toggle ${active}`} onClick={handleToggle}>
                <span className="toggle__switch"></span>
            </div>
            <h4>
                {label}
            </h4>
        </div>
    )
}