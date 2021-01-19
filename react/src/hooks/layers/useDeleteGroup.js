import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../hooks/UserContext';

export default function useDeleteGroup(group) {
    let history = useHistory();
    const { user, setGroups } = useContext(UserContext); 
    const house = user.house._id;
    const groups = user.house.groups;

    const pushUser = async () => {
        history.push('/');
    }

    const updateHouseModel = async (newGroups) => {
        return axios.put(`/houses/${house}`, {
            groups: newGroups   
        }).then(res => { 
            console.log(res); 
            setGroups(newGroups);
        }).catch(err => console.log(err));
    }

    const deleteGroup = async(group) => {
        let newGroups; 
        let groupsRemaining = groups.filter(x => x.id !== group.id);
        if(group.layers.length) { //redistribute layers if they exist
            const ungrouped = groups[groups.length - 1].layers;  //get ungrouped layers 
            const newUngrouped = [...ungrouped, ...group.layers]; //move group's layers to ungrouped layers     
                newGroups = groupsRemaining.map(x => {
                    if(x.id === "ungrouped") {
                        return {
                            ...x,
                            layers: newUngrouped
                        }
                    } return x
                });
                return newGroups;
            } else {
                 newGroups = groupsRemaining;
                 return newGroups;
            }
    }

    async function handleDeleteGroup () {
         const newGroups = await deleteGroup(group); 
        await updateHouseModel(newGroups);
        await pushUser();
     }


    return {
        handleDeleteGroup
    }
}