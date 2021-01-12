import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';

export default function useDeleteLayer(id) {
    let history = useHistory();
    const { rooms, setRooms, groups, setGroups, user } = useContext(UserContext);
    const house = user.house._id;

    const pushUser = async () => {
        history.push('/');
    }

    //GET ROOMS
    const getAllRooms = async () => {
            return axios.get(`/houses/${house}`)
            .then(res => {
                const allRooms = res.data.data.doc.rooms;
                setRooms(allRooms);
            }).catch(err => console.log(err));
    }

    //DELETER LAYER 
    const deleteLayer = async (id) => {
        //remove layer from layer array 
        const layersCopy = [...rooms];
        const newLayers = layersCopy.filter(el => el.id !== id);
        
        //remove layer from its group array 
        let targetGroup;
        let groupCopy = [...groups];

        //get group that contains deleted layer 
            groups.forEach(group => {
                group.layers.forEach(layer => { 
                    if(layer.id === id) {
                        targetGroup = group;
                    } 
                });
        });

        const newGroupLayers = targetGroup.layers.filter(layer => layer.id !== id);
        const newGroups = groupCopy.map(el => {
            if(el.id === targetGroup.id) {
                return {
                    ...el,
                    layers: newGroupLayers
                }
            } return el;
        });
        
        return axios.put(`/houses/${house}`, {
            rooms: newLayers, 
            groups: newGroups  
          }).then( async(res) => {
             console.log(res);
             setGroups(newGroups);
          }).catch(err => console.log(err));
    }

    //DELETER LAYER 
    const deletePosts = async (id) => {
        return await axios.delete(`/posts/h/${house}/${id}`)
        .catch(err => console.log(err)); 
    }

    const handleDeleteLayer = async() => {
        await deleteLayer(id);
        await deletePosts(id);
        await getAllRooms();
        await pushUser();
    }

    return {
        handleDeleteLayer
    }
}

