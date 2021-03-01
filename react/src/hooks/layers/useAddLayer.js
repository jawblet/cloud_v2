import { useState, useContext } from 'react';
import axios from 'axios';
import slugify from 'react-slugify';
import { UserContext } from '../UserContext';
import uuid from 'react-uuid'

export default function useAddLayer() {
    const { user, groups, setGroups } = useContext(UserContext);
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
            console.log(res.data.data.doc.groups);
           // const allRooms = res.data.data.doc.rooms;
           // setRooms(allRooms);
        }).catch(err => console.log(err));
    }

    //VALIDATE LAYER
    const validateLayer = async (layer) => {
        const newSlug = slugify(layer);
        if(!newSlug || newSlug === '') {
            setError({messages: 'Layer names can\'t be blank.', 
            fields: ['room']})
            return;
        }
         
        //validated --> push to layer/group arrays 
        const newId = uuid();
        const getGroups = [...groups];
        const ungrouped = getGroups[getGroups.length - 1].layers;
    
        //get id by +1 to last ID
        const newLayer = {  
            label: layer,
            slug: newSlug,
            description: '//',
            id: newId
        };
        console.log(newLayer);
        
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
        addNewLayer(newGroups);
    }
 
    //CREATE LAYER 
    const addNewLayer = async (newGroups) => {
        return axios.put(`/houses/${house}`, {
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

