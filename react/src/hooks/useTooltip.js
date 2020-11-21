import React, { useState } from 'react'; 

export default function useTooltip() {
    const textRef = React.createRef();

    const [tooltip, showTooltip] = useState(null);
    const [tooltipCoords, setCoords] = useState([]);

    const getTooltip = (e) => {
        showTooltip(e.target.dataset.id);
        const  x  = e.clientX;
        const y = e.clientY - 40;
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