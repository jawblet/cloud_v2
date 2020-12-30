import React, { useState } from 'react';
import Header from '../sections/Header';
import Cards from '../sections/Cards'; 
import ExpandButton from '../atoms/ExpandButton';
import NavBar from '../components/btns/NavBar';
import HouseLegend from '../components/modals/HouseLegend';
import MapHome from '../sections/home/MapHome';
import HomeIcon from '../atoms/HomeIcon';
import { navButtons } from '../data/buttons';

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
            <div className="skylight">
                <HouseLegend/> 
                {zoomIn 
                ? 
                    <Cards squeeze={squeeze}/>
                : <>
                    <MapHome/>
                    <HomeIcon/>
                </>
                }     
            </div>
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