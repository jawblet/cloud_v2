import React, { useEffect, useState, useRef } from 'react';
import usePositionPoints from '../../hooks/usePositionPoints';

const PathCellContent = ({ posts, color }) => {
    const cellRef = useRef(null);
    const [coords, setCoords] = useState(null);

    const { getPinPos, pins } = usePositionPoints();

    useEffect(() => {
        if(cellRef.current) {
           const c = cellRef.current.getBoundingClientRect();
           const radius = c.width / 2;
           const centerX = c.x  + radius;
           const centerY = c.y + (c.height / 2);
           return setCoords({radius, centerX, centerY}); 
        }
        return; 
    }, []);

    useEffect(() => {
        if(coords && posts) {
            getPinPos(coords, posts, color);
        }
    }, [coords]);

    return (
        <div className="pathCell--posts" ref={cellRef}>
            {pins && pins} 
        </div>
    );
}
 
export default PathCellContent;

