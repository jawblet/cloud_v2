import React, { useContext } from 'react';
import { UserContext } from '../../hooks/UserContext';
import { Link } from 'react-router-dom';
import { BlobS1, BlobS2, BlobM1, BlobM2, BlobL1 } from '../../svg/BlobGarden';

export default function MapHome() {
    const { rooms } = useContext(UserContext);
    const line = '#72716B';
    const w = '40%';
    const arr = rooms.length;

    return (
        <div className="mapCanvas">
            <svg width={w} viewBox="0 0 800 800" stroke-width="4" fill="transparent" stroke={line}>
                {rooms.map((room, i) => {
                    const url = `/home/${room.slug}`;
                     switch(i) {
                        case (arr - 1): 
                        return <Link to={url}> 
                                    <BlobS1/>
                                </Link>;
                        case (arr - 2):
                            return <Link to={url}> 
                                    <BlobS2/>
                                </Link>;
                        case (arr - 3):  
                        return <Link to={url}> 
                                    <BlobM1/>
                                </Link>;
                        case (arr - 4):
                            return <Link to={url}> 
                                    <BlobM2/>
                                </Link>;
                        default: return <Link to={url}> 
                                        <BlobL1/>
                                    </Link>;
                    }
                })}
            </svg>
        </div>
    )
} 

/*

*/