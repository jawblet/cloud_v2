import { useContext } from 'react';
import axios from 'axios'; 
import { UserContext } from '../../hooks/UserContext';

export default function useZoneDrop() {
    const {user, groups, setGroups } = useContext(UserContext);
    const house = user.house._id;

    const changeZone = async (newGroups) => {
        return axios.put(`/houses/${house}`, { 
            groups: newGroups
        }).then(res => {
            setGroups(newGroups);
        }).catch(err => console.log(err)); 
    };

    async function handleDrop(dragId, zone) {
        //create new group array
        let id = dragId === 'ungrouped' ? (groups.length - 1) : dragId; 
        const newGroups = [...groups];
        let renamedGroup = groups[id];
        renamedGroup = {...renamedGroup, 
                        zone }; 
        newGroups.splice(id, 1, renamedGroup);
        
        //post color update 
        await changeZone(newGroups); 
    };

    return {
        groups,
        handleDrop 
    }
}

//

/*
 if(dragId === 'ungrouped') {
            console.log('goodbye');
            return;
        }
*/