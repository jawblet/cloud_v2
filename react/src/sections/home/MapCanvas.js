import React, { useContext, useState } from 'react';
import { UserContext } from '../../hooks/UserContext';
import { Link } from 'react-router-dom';
import HomeIcon from '../../atoms/HomeIcon';
import {ContourS1,ContourS2,ContourM1,ContourM2,ContourL1,ContourL2 } from '../../svg/BlobGarden';
import MapKey from '../../sections/home/MapKey';

export default function MapCanvas() {
    const { rooms } = useContext(UserContext);
    const line = '#72716B';
    const w = '40%';
    const arr = rooms.length;

    const newRooms = [...rooms]; // copy array 
    newRooms.sort((a, b) => { //reverse room order for map cartography 
        return b.id - a.id 
    }); 

    //for hover -- abandoned
    const initState = newRooms.map(el => false);
    const [hoverLayers, setHover]= useState(initState);
    const handleHover = (e) => {
        // all layers are hover === false // get hovered layer
        const i = e.target.dataset.id;
        //set state that that layer is hovered 
        const newArr = [...initState];
        newArr[i] = !newArr[i];
        setHover(newArr);
    };

    const handleHoverOut = () => {

    };

    return (
        <div className="map__canvas">
            <MapKey items={rooms} handleHover={handleHover}/>
            <svg width={w} viewBox="0 0 800 800" strokeWidth="3" fill="transparent" stroke={line}
                className="map__SVG">
                {newRooms.map((room, i) => {
                    const url = `/home/${room.slug}`;
                    const num = room.id + 1;
                     switch(i) {
                        case (arr - 1): 
                        return <Link to={url} key={i}> 
                                    <ContourS1 n={num}/>
                                </Link>; 
                        case (arr - 2): 
                            return <Link to={url} key={i}> 
                                    <ContourS2 n={num}/>
                                </Link>;
                        case (arr - 3):  
                        return <Link to={url} key={i}> 
                                    <ContourM1 n={num}/>
                                </Link>;
                        case (arr - 4):
                            return <Link to={url} key={i}> 
                                    <ContourM2 n={num}/>
                                </Link>;
                        case (arr - 5):
                                    return <Link to={url} key={i}> 
                                        <ContourL1 n={num}/>
                                </Link>;
                        default: return <Link to={url} key={i}> 
                                        <ContourL2 n={num}/>
                                    </Link>;
                    }
                })}
            </svg>
            <HomeIcon/>
        </div>
    )
} 

/*

*/