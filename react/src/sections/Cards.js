import React, { useState } from 'react';
import RoomCard from './../components/RoomCard';

export default function Cards( {squeeze, rooms} ) {

    //on click, remove clicked item from array and push to position 0 
    //0 (front), 1 (middle), 2 (back)
    const [positionArray, changePosition] = useState(rooms);

    const getPositionClass = (room) => {
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
        const clickedRoom = e.currentTarget.dataset.id;
        console.log(clickedRoom);
        const roomArr = positionArray; 
        const newArr = roomArr.filter(rm => rm !== clickedRoom); 
        console.log(newArr);
        newArr.unshift(clickedRoom);
        console.log(newArr);
        changePosition(newArr);
    };

    return(
        <>
    <div className="floor">
        {rooms.map((room, index) => {
            if(index <= 1) {
                return (
                    <RoomCard room={room} squeeze={squeeze}
                    handleCardClick={handleCardClick} getPositionClass={getPositionClass}/>
                    )
            }
            })} 
        </div>
        <div className="floor">
        {rooms.map((room, index) => {
            if(index > 1) {
                return (
                    <RoomCard room={room} squeeze={squeeze}
                    handleCardClick={handleCardClick} getPositionClass={getPositionClass}/>
                    )
            }
            })} 
        </div>


        </>
    )
}


