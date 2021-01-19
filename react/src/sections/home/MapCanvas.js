import React, { useContext } from 'react';
import { UserContext } from '../../hooks/UserContext';
import HomeIcon from '../../atoms/HomeIcon';
import DnDMenu from '../../components/dnd/menu/DnDMenu';

export default function MapCanvas() {
    const { groups } = useContext(UserContext);

    return (
        <div className="map__container">
        <div className="map__canvas">
            <HomeIcon/>
        </div>
        <div className="map__key">
            <DnDMenu groupArray={groups} 
                />
        </div>
    </div> 
    )
} 

  

