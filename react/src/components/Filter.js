import React from 'react';
import { VscPaintcan } from 'react-icons/vsc';

export default function Filter (props) { 
   // console.log(props);
    return(
        <menu className="filter">
            {props.filters.map(item => {
                return (
                    <li className={`filter__item ${props.activeFilter.includes(item) ? 'filter__item--active' : ''}`} 
                    key={item} data-id={item}
                    onClick={(e) => props.handleFilterClick(e)}>
                        {item}
                    </li>
                )
            })}

                <div className={`filter__paint ${props.eyedrop ? "filter__paint--active" : ''}`}>
                {props.activeFilter.includes('color') &&
                    <VscPaintcan className={`icon icon__btn ${props.eyedrop ? "icon--active" : ''}`}
                        onClick={props.handlePaintClick}/>
                    }
                </div>
      
        </menu>
    )
}