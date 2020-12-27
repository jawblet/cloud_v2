import React, { useContext } from 'react';
import { UserContext } from '../../hooks/UserContext';
//import useGetGrids from '../../hooks/useGetGrids';
import useRoomCards from '../../hooks/useRoomCards';
import Blob  from '../../components/Blob';

export default function BlobCanvas() {
    const { rooms } = useContext(UserContext);
    const { handleCardClick, getPositionClass } = useRoomCards();

    //console.log(gridArrays);
    return(
        <>
        <div className="blobCanvas"> 
                    {rooms.map(room => {
                        return <Blob room={room} 
                                    handleCardClick={handleCardClick} 
                                    getPositionClass={() => getPositionClass(room.id)}
                                    key={room.id}/>
                    })}
        </div>
        </>
    )
}

/*
    const quads = ['NW', 'NE', 'SW', 'SE'];
    const { loading, gridArrays } = useGetGrids({skipInterval: 4, allPosts: rooms});

 {Object.values(gridArrays).map((rooms, i) => {
                const quad = quads[i];
                return (
                    //return four quads of grid
                    <section className={`blobGrid blobGrid--${quad}`} key={quad}>
                      </section>

*/