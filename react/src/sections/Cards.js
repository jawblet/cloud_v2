import React, { useState, useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import RoomCard from './../components/RoomCard';
/*eslint-disable*/

export default function Cards( {squeeze } ) {
    const { rooms } = useContext(UserContext);

    const roomIdArr = rooms.map(room => room.id);


    //on click, remove clicked item from array and push to position 0 
    //0 (front), 1 (middle), 2 (middle/back), 3 (back)
    const [positionArray, changePosition] = useState(roomIdArr); 

    const getPositionClass = (room) => {
        //the first three cards should have dedicated class, rest are back by default
        if(positionArray.length > 0) {
            let position;
            const index = positionArray.indexOf(room);
            switch(index) {
                case 0: position = "front";
                break;
                case 1: position = "middle";
                break;
                case 2: position = "middleBack";
                break;
                case 3: position = "back";
                break;
                default: position = "back";
            }
            return position;
        }
    };

    const handleCardClick = (e) => {
        //1. get id of clicked room + make int 
        const clickedRoom = parseInt(e.currentTarget.dataset.id);

        //2. filter clicked room out from state
        const indexArr = positionArray; 
        const newArr = indexArr.filter(rm => rm !== clickedRoom); 
        newArr.unshift(clickedRoom);
        changePosition(newArr);
    };

    return(
        <div className="floor__plan">
        <div className="floor">
            {rooms.map((room, index) => { 
                if(index <= 1) {
                    return (
                        <RoomCard room={room} squeeze={squeeze} key={room.id}
                        handleCardClick={handleCardClick} getPositionClass={() => getPositionClass(room.id)}/>
                        )
                }
                })} 
            </div>
            <div className="floor">
            {rooms.map((room, index) => {
                if(index > 1) {
                    return (
                        <RoomCard room={room} squeeze={squeeze} key={room.id}
                        handleCardClick={handleCardClick} getPositionClass={() => getPositionClass(room.id)}/>
                        )
                }
                })} 
            </div>
        </div>
    )
}


