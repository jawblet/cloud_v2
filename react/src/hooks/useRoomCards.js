import React, { useState, useContext } from 'react';
import { UserContext } from '../hooks/UserContext';

export default function useRoomCards() {
    const { rooms } = useContext(UserContext);
    
    // GET CARD POSITION 
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

    // CHANGE CARD POSITION 
    const handleCardClick = (e) => {
        //1. get id of clicked room + make int 
        const clickedRoom = parseInt(e.currentTarget.dataset.id);
        //2. filter clicked room out from state
        const indexArr = positionArray; 
        const newArr = indexArr.filter(rm => rm !== clickedRoom); 
        newArr.unshift(clickedRoom);
        changePosition(newArr);
    };

    return {
        getPositionClass,
        handleCardClick
    }
}