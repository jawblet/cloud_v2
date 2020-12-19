import React, { useState } from 'react';
import Header from '../sections/Header';
import Cards from '../sections/Cards'; 
import ExpandButton from '../atoms/ExpandButton';
import { VscAdd, VscSave, VscMilestone } from 'react-icons/vsc';
import useTooltip from '../hooks/useTooltip'; 
import NavBar from '../components/btns/NavBar';
import Tooltip from '../atoms/Tooltip';
import HouseLegend from '../components/modals/HouseLegend';

export default function Home() {
    const [squeeze, setSqueeze] = useState(true);
    const handleExpandClick = () => { setSqueeze(!squeeze); }
    
    const buttons = [
        {name: 'paths', url: 'paths', icon: <VscMilestone className="icon icon__btn" data-id="paths"/>}, 
        {name: 'library', url: 'library', icon: <VscSave className="icon icon__btn" data-id="library"/>},
        {name: 'add', url: 'add', icon: <VscAdd className="icon icon__btn" data-id="add"/>},
        {name: 'squeeze', type: 'bottom', icon: <ExpandButton className="icon icon__btn" squeeze={squeeze} data-id="squeeze"/> }
    ];

    const { textRef, tooltip, tooltipCoords, getTooltip, hideTooltip } = useTooltip();

    return (
        <div className="page">
            <Header/> 
            <div className="skylight">
                <div className="skylight__sidebar">
                    <div className="skylight__sidebar__nav">
                        <NavBar buttons={buttons} ref={textRef} direction="column"
                                getTooltip={getTooltip} hideTooltip={hideTooltip}
                                handleExpandClick={handleExpandClick} squeeze={squeeze} />
                        {tooltip && <Tooltip tooltip={tooltip} tooltipCoords={tooltipCoords}/>}
                    </div>
                    <div className="skylight__sidebar__key">
                        <HouseLegend/>
                    </div>
                </div>
                <div className="skylight__layout">
                    <Cards squeeze={squeeze}/>
                </div>
            </div>
        </div>

    )
}; 