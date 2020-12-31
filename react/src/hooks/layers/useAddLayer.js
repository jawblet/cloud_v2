import { useState, useContext } from 'react';
import axios from 'axios';
import slugify from 'react-slugify';
import { UserContext } from '../UserContext';

export default function useAddLayer() {
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

    //GET ROOMS
    const getAllRooms = async () => {
        await axios.get(`/houses/${house}`)
        .then(res => {
            console.log(res.data.data.doc.rooms);
            const allRooms = res.data.data.doc.rooms;
            setRooms(allRooms);
        }).catch(err => console.log(err));
    }

    //VALIDATE LAYER
    const validateLayer = async (layer) => {
        const roomSlugs = rooms.map(el => el.slug);
        const newSlug = slugify(layer);
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
               
        const newLayers = [...rooms];
        //get id by +1 to last ID
        const newLayer = {  
            label: layer,
            slug: newSlug,
            description: '//',
            id: rooms[rooms.length - 1].id + 1
        };
        newLayers.push(newLayer);
        addNewLayer(newLayers);
    }
 
    //CREATE LAYER 
    const addNewLayer = async (newLayers) => {
        return axios.put(`/houses/${house}`, {
            rooms: newLayers   
          }).then( async (res) => {
              setSuccess('Room was created.')
          }).catch(err => console.log(err));
    }

    //handle user actions 
    const handleAddRoom = async (e) => {
        e.preventDefault(e);
        setError(null); //clear state 
        setSuccess(null);
        await validateLayer(roomInput);
        await getAllRooms();
    }

    return {
        handleChange,
        handleAddRoom,
        roomInput,
        error,
        success
    }
}

