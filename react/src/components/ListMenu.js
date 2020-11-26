import React from 'react';

export default function ListMenu({ list, title, activeItem, handleOneFilter }) {
    return(
        <menu>
            <h4 className="listmenu__title">{title}</h4>    
            {list.map(item => {
                return(
                    <li className={`listmenu__item ${activeItem === item ? 'active' : ''}`} 
                        key={item} data-id={item} onClick={(e) => handleOneFilter(e)}>
                        {item}
                    </li>
                )
            })}
        </menu>
    )
}