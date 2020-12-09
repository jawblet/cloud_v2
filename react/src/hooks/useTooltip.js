import React, { useState } from 'react'; 

export default function useTooltip() { 
    const textRef = React.createRef();

    const [tooltip, showTooltip] = useState(null); 
    const [tooltipCoords, setCoords] = useState([]);

    // this tooltip position --> right of cursor
    const getTooltip = (e) => {
        showTooltip(e.target.dataset.id);
        const  x  = e.clientX + 40; 
        const y = e.clientY;
        setCoords([x, y]);
    }

    const hideTooltip = (e) => {
        if(textRef.current && textRef.current.contains(e.target)) {
          showTooltip(null);
        }
    }

    return {
        textRef,
        tooltip,
        tooltipCoords,
        getTooltip,
        hideTooltip
    }
};