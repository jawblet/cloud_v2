import { useState, useContext } from 'react';
import axios from 'axios';
import slugify from 'react-slugify';
import { UserContext } from './UserContext';

export default function useAddRoom() {
    const { user, rooms, setRooms } = useContext(UserContext);
    const house = user.house._id;

    // set global context from rooms as init state 
    const [roomInput, setNewRoom] = useState('');
    const [error, setError] = useState(null); 
    const [success, setSuccess] = useState(null); 

    //HANDLE USER INPUT
    const handleChange = (e) => {
        setNewRoom(e.currentTarget.value);
    }

    //CREATE ROOM 
    const addNewRoom = async (newRoom) => {
        //validate room
        const roomSlugs = rooms.map(el => el.slug);
        const newSlug = slugify(newRoom);
        const doesRoomExist = roomSlugs.includes(newSlug);
        if(!newSlug || newSlug === '') {
            setError({messages: 'Names can\'t be blank.', 
            fields: ['room']})
            return;
        }
        if(doesRoomExist) {
            setError({messages: 'That room is already mapped.', 
            fields: ['room']})
            return;
        }
        //create room 
        const newRooms = [...rooms];
        const room = {
            label: newRoom,
            slug: newSlug,
            id: rooms[rooms.length - 1].id + 1
        };
        newRooms.push(room);
        await axios.put(`/houses/${house}`, {
            rooms: newRooms   
          }).then( async (res) => {
              setSuccess('Room was created.')
              return await axios.get(`/houses/${house}`)
            }).then(res => { //get rooms + set state 
                  const allRooms = res.data.data.doc.rooms;
                  setRooms(allRooms);
          }).catch(err => console.log(err));
    }

    const handleAddRoom = (e) => {
        e.preventDefault(e);
        setError(null);
        setSuccess(null);
        addNewRoom(roomInput);
    }

    return {
        handleChange,
        handleAddRoom,
        roomInput,
        error,
        success
    }
}

//pattern of chaining post + get was not working reliably... not sure why--! 


 /*
getAllRooms();

    const getAllRooms = async () => {
        await axios.get(`/houses/${house}`)
        .then(res => {
            console.log(res.data.data.doc.rooms);
            const allRooms = res.data.data.doc.rooms;
            setRooms(allRooms);
        }).catch(err => console.log(err));
    }
    */