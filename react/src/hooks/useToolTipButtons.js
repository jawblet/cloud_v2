import { useEffect, useState } from 'react';

export default function useToolTipButtons(btns) {
    const [tooltips, setTooltips] = useState([]);
    const initArray = btns.map(btn => false);

    const hideTooltip = () => {
        setTooltips(initArray);
    }

    useEffect(() => {
        //set init state
        hideTooltip();
    }, [btns]);

    const getTooltip = (e) => {
        //clear all tooltips before getting a new one 
        const i = e.currentTarget.dataset.id;
        initArray[i] = !initArray[i];
        setTooltips(initArray);
    }

    return {
        tooltips,
        getTooltip,
        hideTooltip,
    }
}
