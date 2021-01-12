import React from 'react';
import MenuItem from '../../atoms/MenuItem';

export default function FilterMenu(props) {
    return(
        <menu>
            <h4 className="listmenu__title">{props.title}</h4>    
            {props.list.map((item, i) => {
                return(
                    <MenuItem
                        key = {i}
                        item={item} id={i} 
                    // active={active}
                    // handleClick={handleClick} 
                    />
                ) 
            })}
        </menu>
    )
}