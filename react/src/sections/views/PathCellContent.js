import React, { useEffect, useRef } from 'react';
import usePositionPoints from '../../hooks/usePositionPoints';
import Fade from '../../components/animate/Fade';

const PathCellContent = ({ posts, color, squeeze }) => {
    const cellRef = useRef(null);

    const { getPinPos, pins } = usePositionPoints(); 

      useEffect(() => {
        getPinPos(posts, color);
      }, []);

    if(!posts) {
        return null;
    }

    return ( 
        <div className="pathCell--posts" ref={cellRef} 
                style={{height: squeeze ? '5vw' : `${(posts.length*10)}vw`}} >
            <Fade in={!squeeze}>
                {pins && pins} 
            </Fade>
        </div>
    );
}
 
export default PathCellContent;

