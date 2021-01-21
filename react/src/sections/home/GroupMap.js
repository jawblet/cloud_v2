import React, { useEffect, useState } from 'react';
import { LayerIcon } from '../../svg/LayerIcons';

const GroupMap = (props) => {
    const [layers, setLayers] = useState([]);

    useEffect(() => {
        async function loadLayers() {
            const layerPromises = props.layers.map(async layer => {
                console.log(layer)
                        return <span key={layer.id}>
                        {layer.label}
                        <LayerIcon l="4.5rem" 
                                    id={`L${layer.id}`} 
                                    stroke={1}
                                    />
                        </span>
                });
            Promise.all(layerPromises).then(res => setLayers(res));
        }
        loadLayers();
    }, []);

    console.log(layers);

    return (
        <>
            {layers}
        </>
        );
}
 
export default GroupMap;