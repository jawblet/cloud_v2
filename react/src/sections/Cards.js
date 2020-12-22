import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import RoomCard from './../components/RoomCard';
import useRoomCards from '../hooks/useRoomCards';
/*eslint-disable*/

export default function Cards( { squeeze } ) {
    const { rooms } = useContext(UserContext);

    const { handleCardClick, getPositionClass } = useRoomCards();

    const [postArrays, setPostArrays] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(rooms) { 
            let postArrays;
            const postTotal = rooms.length; 
            const numRows = [...Array(Math.ceil((postTotal + 1) / 3))];
            postArrays = numRows.map((row, i) => 
                (i === 0) 
                    ? rooms.slice(i * 2, i * 2 + 2)
                        
                    : rooms.slice(i * 3, i * 3 + 3)  
                )
            setPostArrays(postArrays);
            setLoading(false);
        }
    }, [rooms]);
    
     
    return(
        <>        
        {!loading && 
                postArrays.map((floor, i) => {
                    return(
                    <div className="floor" key={i}>
                        {floor.map((room, i) => {
                            return (
                                <RoomCard room={room} squeeze={squeeze} key={room.slug}
                                    handleCardClick={handleCardClick} 
                                    getPositionClass={() => getPositionClass(room.id)}
                                    />
                            )
                        })}
                    </div>
                    )
                 })
            }
        </>
    )
}


/*
 <div className="floor__plan" key={room.slug}>
                                    <RoomCard room={room} squeeze={squeeze}
                                    handleCardClick={handleCardClick} 
                                    getPositionClass={() => getPositionClass(room.id)}
                                    />
                                </div>
    */