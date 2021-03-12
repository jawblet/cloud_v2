import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import usePositionPoints from '../../hooks/usePositionPoints';

const PathCellContent = ({ posts, color }) => {
    const cellRef = useRef(null);
   // const [width, setWidth] = useState(window.innerWidth);
    const [coords, setCoords] = useState(null);

    const { getPinPos, pins } = usePositionPoints();
    /*
    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
    
        return () => window.removeEventListener("resize", handleWindowResize);
      }, []);
      */
        
    useLayoutEffect(() => {
        if(posts && cellRef.current) {
           const c = cellRef.current.getBoundingClientRect();
           const radius = c.width / 2;
           const centerX = c.x  + radius;
           const centerY = c.y + (c.height / 2);
           return setCoords({radius, centerX, centerY}); 
        }
        return; 
    }, []); //width

    useLayoutEffect(() => {
        if(coords) {
            getPinPos(coords, posts, color);
        }
    }, [coords]);

    if(!posts) {
        return null;
    }

    return ( 
        <div className="pathCell--posts" ref={cellRef} 
                style={{height:`${(posts.length*10)}vw`}}>
            {pins && pins} 
        </div>
    );
}
 
export default PathCellContent;

