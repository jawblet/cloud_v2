import React, { useContext } from 'react';
import { UserContext } from '../../hooks/UserContext';
import HomeIcon from '../../atoms/HomeIcon';
import DnDMenu from '../../components/dnd/menu/DnDMenu';
import GroupMap from './GroupMap';

export default function MapCanvas() {
    const { groups } = useContext(UserContext);
    
    return (
            <div className="map__container">
                <div className="map__canvas">
                    {groups.map(group => {
                        return <GroupMap layers={group.layers}/>
                    })}
                    <HomeIcon/>
                </div>
                <div className="map__key">
                    <DnDMenu groupArray={groups} 
                        />
                </div>
            </div> 
    )
} 

  

/*
     const layerPromises = groups.map(group => {
                return group.layers.map(async layer => {
                    const LayerPath = await importLayer(layer.id);
                    return <LayerPath key={layer.id}/>
                })
            });
*/