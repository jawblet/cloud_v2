import React, { useState, useContext } from 'react';
import Header from '../sections/Header';
import LayerView from '../sections/views/LayerView';
import PathView from '../sections/views/PathView';
import NavBar from '../components/btns/NavBar';
import HouseLegend from '../components/modals/HouseLegend';
import { navButtons } from '../data/buttons';
import useRefreshLayers from '../hooks/layers/useRefreshLayers';
import { UserContext } from '../hooks/UserContext';
import SwitchFade from '../components/animate/SwitchFade';
import useSqueeze from '../hooks/useSqueeze';

export default function Home() {
    const { groups, globalTags } = useContext(UserContext);
    useRefreshLayers();
    
    //set view 
    const [zoomIn, setZoom] = useState(true); 

    //set squeeze
    const { squeeze, squeezeBtn, handleSqueeze } = useSqueeze();

    return ( 
        <div className="page">  
            <Header/> 
            <div className="map">
                <div className="map__nav">
                    <NavBar buttons={navButtons} 
                            squeezeBtn={squeezeBtn} 
                            direction="row"
                            handleExpandClick={handleSqueeze} 
                            squeeze={squeeze}
                            zoomIn={zoomIn} 
                            setZoom={setZoom} />
                </div>
                <SwitchFade state={zoomIn}>
                    {zoomIn 
                        ?   <LayerView groups={groups} squeeze={squeeze}
                            />
                        :   <PathView paths={globalTags} squeeze={squeeze}
                            /> } 
                </SwitchFade>
                </div>
                
        </div>
    )
}; 