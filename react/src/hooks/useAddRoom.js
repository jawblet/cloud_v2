import { useState, useContext } from 'react'; 
import axios from 'axios';
import slugify from 'react-slugify';
import { UserContext } from './UserContext';

export default function useRenameRoom() {
    const { user, setRooms } = useContext(UserContext);
    const house = user.house._id;
    const rooms = user.house.rooms;
    const roomSlugs = user.house.rooms.map(el => el.slug);
    console.log(roomSlugs.length);

    const [newRoom, setNewRoom] = useState('');
    const [error, setError] = useState(null); 
    const [success, setSuccess] = useState(null); 

    const handleChange = (e) => {
        setNewRoom(e.currentTarget.value);
    }

    const addNewRoom = async (newSlug) => {
        const newRooms = [...rooms];
        const room = {
            label: newRoom,
            slug: newSlug,
            id: rooms.length
        };
        newRooms.push(room);
  
        await axios.put(`/houses/${house}`, {
            rooms: newRooms   
          }).then(res => {
              setRooms(newRooms);
              setSuccess('Room was created.')
          })
          .catch(err => console.log(err));
    }


    const checkRoom = async (newRoom) => {
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
        addNewRoom(newSlug)
    }


    const handleAddRoom = (e) => {
        e.preventDefault(e);
        setError(null);
        setSuccess(null);
        checkRoom(newRoom);
        //get new rooms

    }

    return {
        handleChange,
        handleAddRoom,
        newRoom,
        error,
        success
    }
}