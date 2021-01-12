import React from 'react';

const MenuItem = (props) => {
    const {item, id } = props;
    return (
        <li className={`listmenu__item ${props.active && 'active'}`} 
            data-id={id} 
            //onClick={props.handleClick}
            >
        {item.label}
    </li>
    );
}
 
export default MenuItem;