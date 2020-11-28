import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Header from '../sections/Header';
import Cards from '../sections/Cards'; 
import ExpandButton from './../atoms/ExpandButton';
import Room from './Room';
import { VscAdd, VscSave, VscTag } from 'react-icons/vsc';
import useTooltip from '../hooks/useTooltip';
import NavBar from '../components/NavBar';
import Tooltip from '../atoms/Tooltip';

export default function Home() {
    const [squeeze, setSqueeze] = useState(true);
    
    const handleExpandClick = () => {
        setSqueeze(!squeeze);
    }

    const buttons = [
        {name: 'tags', url: 'tags', icon: <VscTag className="icon icon__btn" data-id="tags"/>}, 
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
                    <div className="fixedBtn">
                        <NavBar buttons={buttons} ref={textRef} direction="column"
                                getTooltip={getTooltip} hideTooltip={hideTooltip}
                                handleExpandClick={handleExpandClick} squeeze={squeeze} />
                        {tooltip && <Tooltip tooltip={tooltip} tooltipCoords={tooltipCoords}/>}
                    </div>
                </div>
                <div className="skylight__layout">
                    <Cards squeeze={squeeze}/>
                </div>
            </div>
            <Route path='/home/:room' component={Room} />
        </div>
    )
}; 