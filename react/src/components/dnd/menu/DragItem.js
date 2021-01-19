import React from 'react';
import { Link } from 'react-router-dom';
import { Layer1 } from '../../../svg/LayerIcons';

const DragItem = ({layer, group}) => {
    return (
        <Link to={`/${layer.slug}`}>
        <p className={`dnd__item 
         ${group.id !== 'ungrouped' ? 'dnd__item--nested' : ''}
        `}
        > 
            <Layer1 l="0.8rem"/>
            {layer.label}
        </p>
    </Link>
    );
}
 
export default DragItem;