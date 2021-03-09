import React from 'react';
import { Link } from 'react-router-dom';
import { LayerIcon } from '../../../svg/LayerIcons';

const DragItem = ({layer, group }) => {
    return (
        <Link to={`/${layer.slug}`} 
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
