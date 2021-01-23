import React from 'react';
import { Link } from 'react-router-dom';
import { LayerIcon } from '../../../svg/LayerIcons';

const DragItem = ({layer, group, setHoverId}) => {
    return (
        <Link to={`/${layer.slug}`} 
            onMouseEnter={() => setHoverId(layer.id)}
            onMouseLeave={() => setHoverId(null)}
        >
        <p className={`dnd__item 
         ${group.id !== 'ungrouped' ? 'dnd__item--nested' : ''}
        `}
        > 
        <LayerIcon l="0.8rem" id={`L${layer.id}`}/>
            {layer.label}
        </p> 
    </Link>
    );
}
 
export default DragItem;
