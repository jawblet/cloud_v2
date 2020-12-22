import React, { useState } from 'react';
import Header from '../sections/Header';
import Cards from '../sections/Cards'; 
import ExpandButton from '../atoms/ExpandButton';
import useTooltip from '../hooks/useTooltip'; 
import NavBar from '../components/btns/NavBar';
import Tooltip from '../atoms/Tooltip';
import HouseLegend from '../components/modals/HouseLegend';
import { navButtons } from '../data/buttons';

export default function Home() {
    const [squeeze, setSqueeze] = useState(true);
    const handleExpandClick = () => { setSqueeze(!squeeze); }
    
    const squeezeBtn = [
        {name: 'squeeze', 
        type: 'bottom', 
        icon: <ExpandButton className="icon icon__btn" squeeze={squeeze} data-id="squeeze"/> }
    ];

    const { textRef, tooltip, tooltipCoords, getTooltip, hideTooltip } = useTooltip();

    return (
        <div className="page">  
            <Header/> 
            <div className="skylight">
                    <HouseLegend/>
                    <Cards squeeze={squeeze}/>
            </div>
                <div className="skylight__nav">
                    <NavBar navButtons={navButtons} 
                            squeezeBtn={squeezeBtn} 
                            ref={textRef} direction="column"
                            getTooltip={getTooltip} hideTooltip={hideTooltip}
                            handleExpandClick={handleExpandClick} squeeze={squeeze} />
                    {tooltip && <Tooltip tooltip={tooltip} tooltipCoords={tooltipCoords}/>}
                </div>
        </div>
    )
}; 