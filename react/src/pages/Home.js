import React, { useState, useContext } from 'react';
import Header from '../sections/Header';
import LayerView from '../sections/views/LayerView';
import PathView from '../sections/views/PathView';
import NavBar from '../components/btns/NavBar';
import HouseLegend from '../components/modals/HouseLegend';
import ExpandButton from '../atoms/ExpandButton';
import { navButtons } from '../data/buttons';
import useRefreshLayers from '../hooks/layers/useRefreshLayers';
import { UserContext } from '../hooks/UserContext';
import DnDMenu from '../components/dnd/menu/DnDMenu';
import SwitchFade from '../components/animate/SwitchFade';


export default function Home() {
    const { groups } = useContext(UserContext);
    useRefreshLayers();

    const [squeeze, setSqueeze] = useState(true);
    const handleExpandClick = () => { setSqueeze(!squeeze); }
    
    const squeezeBtn = [
        {id: 4, 
        name: 'squeeze', 
        type: 'bottom', 
        icon: <ExpandButton className="icon icon__btn" squeeze={squeeze} data-id="squeeze"/> }
    ];

    const [zoomIn, setZoom] = useState(true); 
    const [hoverId, setHoverId] = useState(null);

    return ( 
        <div className="page">  
            <Header/> 
            <HouseLegend/> 
           <SwitchFade state={zoomIn}>
            <div className="map">
                        <div className="map__canvas">
                            {zoomIn 
                                ?   <LayerView groups={groups}
                                    />
                                :   <PathView groups={groups} hoverId={hoverId}    
                                    />
                            }
                        </div>
                        <div className="map__key">
                            <DnDMenu groupArray={groups} 
                                    hoverId={hoverId}  
                                    setHoverId={setHoverId}/> 
                        </div>    
                </div>
           </SwitchFade>
                <div className="map__nav">
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

