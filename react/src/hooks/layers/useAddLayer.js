import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import slugify from 'react-slugify';
import { UserContext } from '../UserContext';

export default function useAddLayer() {
    const { user, rooms, groups, setRooms, setGroups } = useContext(UserContext);
    const house = user.house._id; 

    // set global context from rooms as init state 
    const [roomInput, setNewRoom] = useState('');
    const [error, setError] = useState(null); 
    const [success, setSuccess] = useState(null); 

    //HANDLE USER INPUT
    const handleChange = (e) => {
        setNewRoom(e.currentTarget.value);
    }

    //get newId 
    const getNewId = (rooms) => {
        return (rooms[rooms.length - 1].id + 1).toString();
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
            setError({messages: 'Layer names can\'t be blank.', 
            fields: ['room']})
            return;
        }
        if(doesRoomExist) {
            setError({messages: 'That layer is already mapped.', 
            fields: ['room']})
            return;
        }
         
        //validated --> push to layer/group arrays 
        const newId = getNewId(rooms);
        const newLayers = [...rooms];
        const getGroups = [...groups];
        const ungrouped = getGroups[getGroups.length - 1].layers;
    
        //get id by +1 to last ID
        const newLayer = {  
            label: layer,
            slug: newSlug,
            description: '//',
            id: newId
        };
        //add new layers to layers 
        newLayers.push(newLayer);

        //add new layer to group
        const newUngrouped = [...ungrouped, newLayer]; // all new ungrouped layers    
        const newGroups = getGroups.map(x => {
            if(x.id === "ungrouped") {
                return {
                    ...x,
                    layers: newUngrouped
                }
            } return x
        });
        addNewLayer(newLayers, newGroups);
    }
 
    //CREATE LAYER 
    const addNewLayer = async (newLayers, newGroups) => {
        return axios.put(`/houses/${house}`, {
            rooms: newLayers,
            groups: newGroups
          }).then( async() => {
              setGroups(newGroups);
              setSuccess('Layer created.');
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

