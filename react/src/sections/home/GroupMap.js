import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LayerIcon } from '../../svg/LayerIcons';
import * as zones from '../../data/zones';

const GroupMap = ({ group, hoverId }) => {

    const [layers, setLayers] = useState([]);
    console.log(zones.fungus[0]);
    useEffect(() => { 
        async function loadLayers() {
            const layerPromises = group.layers.map(async (layer, i) => {
                        const stroke = (hoverId === layer.id) ? '#00e3eb' : 'currentColor'; 
                        const zone = zones[group.zone];
                        return  <Link to={`/${layer.slug}`} 
                            className="layerMap" key={layer.id}>
                                <LayerIcon l="4.5rem" 
                                            id={`L${layer.id}`} 
                                            strokeWidth={1}
                                            stroke={stroke}
                                            fill={zone[i]}
                                            />
                            </Link>
                        
                        
                       
                });
            Promise.all(layerPromises).then(res => setLayers(res));
        } 
        loadLayers();
    }, [hoverId]);

    return (
        <div className="map">
            <h4 className="map__title">
                {group.label}
            </h4>
            {layers}
        </div>
        );
}
 
export default GroupMap;
