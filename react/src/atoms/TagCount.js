import React from 'react';
import Fade from '../components/animate/Fade';

const TagCount = ({tag, activeFilter}) => {
    return (
    <Fade in={activeFilter.includes('count')}>
        <h4 className="tag__count">
            {tag.countEach}
        </h4> 
    </Fade>
    );
}
 
export default TagCount;