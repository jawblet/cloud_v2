import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';

export default function useDeleteLayer(id) {
    let history = useHistory();
    const { rooms, setRooms, user } = useContext(UserContext);
    const house = user.house._id;

    const pushUser = async () => {
        history.push('/');
    }

    //GET ROOMS
    const getAllRooms = async () => {
            return axios.get(`/houses/${house}`)
            .then(res => {
                //console.log(res.data.data.doc.rooms);
                const allRooms = res.data.data.doc.rooms;
                setRooms(allRooms);
            }).catch(err => console.log(err));
    }

    //DELETER LAYER 
    const deleteLayer = async (id) => {
        const layersCopy = [...rooms];
        const newLayers = layersCopy.filter(el => el.id !== id);
        return axios.put(`/houses/${house}`, {
            rooms: newLayers   
          }).then( async (res) => {
             console.log(res);
          }).catch(err => console.log(err));
    }

    //DELETER LAYER 
    const deletePosts = async (id) => {
        return await axios.delete(`/posts/h/${house}/${id}`)
        .then(res => {
            console.log(res);
        }).catch(err => console.log(err)); 
    }

    const handleDeleteLayer = async() => {
        console.log(id);
        await deleteLayer(id);
        await deletePosts(id);
        await getAllRooms();
        await pushUser();
    }

    return {
        handleDeleteLayer
    }
}

