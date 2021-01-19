import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';

export default function useDeleteLayer(id) {
    let history = useHistory();
    const { setGroups, groups, user } = useContext(UserContext);
    const house = user.house._id;

    const pushUser = async () => {
        history.push('/');
    }

    //GET GROUPS
    const getAllRooms = async () => {
            return axios.get(`/houses/${house}`)
            .then(res => {
                const allGroups = res.data.data.doc.groups;
                setGroups(allGroups);
            }).catch(err => console.log(err)); 
    }

    //DELETE LAYER 
    const deleteLayer = async (id) => {         
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
            groups: newGroups  
          }).catch(err => console.log(err));
    }

    //DELETER LAYER'S POSTS 
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

