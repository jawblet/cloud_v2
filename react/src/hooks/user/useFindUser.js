import { useState, useEffect } from 'react';
import axios from 'axios'; 
 
export default function useFindUser() {
const [user, setUser] = useState(null);
const [globalTags, setGlobalTags] = useState(null);
const [rooms, setRooms] = useState(null);
const [isLoading, setLoading] = useState(true); 

useEffect(() => {
    async function findUser() {
        await axios.get('/user')
            .then(res => { 
                const user = res.data.currentUser;
                setUser(user);
                const rooms = res.data.currentUser.house.rooms
                setRooms(rooms);
        return axios.get(`/tags/h/${user.house._id}`);
        }).then(res => {
                const tags = res.data.data.results
                setGlobalTags(tags);
                setLoading(false); 
        }).catch(err => {
            console.log(err);
            // even if no user --> set to not loading  
            setLoading(false); 
        });
    }
    findUser();
    }, []);
                    
    return {
        user,
        rooms,
        globalTags,
        setUser,
        setRooms,
        setGlobalTags,
        isLoading
    }
}






