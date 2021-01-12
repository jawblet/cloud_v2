import React from 'react';

export default function ListMenu({ list, title, activeItem, handleOneFilter }) {
    return(
        <menu>
            <h4 className="listmenu__title">{title}</h4>    
            {list.map(item => {
                return(
                    <li key={item} 
                        className={`listmenu__item ${activeItem === item ? 'active' : ''}`} 
                        data-id={item} 
                        onClick={(e) => handleOneFilter(e)}>
                        {item}
                    </li>
                ) 
            })}
        </menu>
    )
}