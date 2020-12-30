import React from 'react';
import { Link } from 'react-router-dom';

export default function MapKey({items, handleHover}) {
    return(
        <div className="mapKey">
            <ol>
            {items.map((item, i) => {
                 const url = `/home/${item.slug}`;
                return(
                    <Link to={url}>
                        <li key={i} className="listItem mapKey__item" data-id={i} onMouseEnter={handleHover}>
                            {item.label}
                        </li>
                    </Link>
                )
                })
                }
            </ol> 
        </div>
    )
}