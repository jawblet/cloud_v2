import React from 'react';

export default function ListMenu({ list, title, activeItem, handleListSelect }) {
    return(
        <menu>
            <h4 className="listmenu__title">{title}</h4>    
            {list.map(item => {
                return(
                    <li className={`listmenu__item ${activeItem === item ? 'active' : ''}`} 
                        key={item} data-id={item} onClick={(e) => handleListSelect(e)}>
                        {item}
                    </li>
                )
            })}
        </menu>
    )
}