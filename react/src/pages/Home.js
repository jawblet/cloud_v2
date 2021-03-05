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

    //get paths 
    //const { tags, loading } = useTags('date');
    
    //set view 
    const [zoomIn, setZoom] = useState(false); 

    //set squeeze
    const { squeeze, squeezeBtn, handleSqueeze } = useSqueeze();

    const [hoverId, setHoverId] = useState(null);

    return ( 
        <div className="page">  
            <Header/> 
            <HouseLegend/> 
           <SwitchFade state={zoomIn}>
            <div className="map">
                    {zoomIn 
                            ?   <LayerView groups={groups} zoomIn={zoomIn} setHoverId={setHoverId}
                                    />
                            :   <PathView paths={globalTags}
                                    /> 
                        } 
                </div>
           </SwitchFade>
                <div className="map__nav">
                    <NavBar buttons={navButtons} 
                            squeezeBtn={squeezeBtn} 
                            direction="column"
                            handleExpandClick={handleSqueeze} 
                            squeeze={squeeze}
                            zoomIn={zoomIn} 
                            setZoom={setZoom} />
                </div>
        </div>
    )
}; 

