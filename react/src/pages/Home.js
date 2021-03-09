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
    const [zoomIn, setZoom] = useState(false); 

    //set squeeze
    const { squeeze, squeezeBtn, handleSqueeze } = useSqueeze();

    return ( 
        <div className="page">  
            <Header/> 
            <HouseLegend/> 
            <div className="map">
                <SwitchFade state={zoomIn}>
                    {zoomIn 
                            ?   <LayerView groups={groups} zoomIn={zoomIn}
                                    />
                            :   <PathView paths={globalTags}
                                    /> 
                        } 
                </SwitchFade>
                </div>
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

/* 
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
*/

//    const [hoverId, setHoverId] = useState(null);

