import React, { useState } from 'react';
import Header from '../sections/Header';
import CardCanvas from '../sections/home/CardCanvas'; 
import MapCanvas from '../sections/home/MapCanvas';
import NavBar from '../components/btns/NavBar';
import HouseLegend from '../components/modals/HouseLegend';
import ExpandButton from '../atoms/ExpandButton';
import { navButtons } from '../data/buttons';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

export default function Home() {
    const [squeeze, setSqueeze] = useState(true);
    const handleExpandClick = () => { setSqueeze(!squeeze); }
    
    const squeezeBtn = [
        {id: 4, 
        name: 'squeeze', 
        type: 'bottom', 
        icon: <ExpandButton className="icon icon__btn" squeeze={squeeze} data-id="squeeze"/> }
    ];

    const [zoomIn, setZoom] = useState(true); 

    return ( 
        <div className="page">  
            <Header/> 
            <HouseLegend/> 
            <SwitchTransition mode="out-in">
                <CSSTransition key={zoomIn} 
                        timeout={350} 
                        classNames="fade" 
                        addEndListener={(node, done) => {
                                        node.addEventListener("transitionend", done, false);
                        }}> 
                <div className="skylight">
                        {zoomIn 
                            ? <CardCanvas squeeze={squeeze}/>
                            : <MapCanvas/> 
                        }     
                </div>
            </CSSTransition>
            </SwitchTransition>
                <div className="skylight__nav">
                    <NavBar buttons={navButtons} 
                            squeezeBtn={squeezeBtn} 
                            direction="column"
                            handleExpandClick={handleExpandClick} 
                            squeeze={squeeze}
                            zoomIn={zoomIn} 
                            setZoom={setZoom} />
                </div>
        </div>
    )
}; 