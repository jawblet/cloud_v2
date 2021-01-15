import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios'; 

export default function useHouse() {
    const { user } = useContext(UserContext);

    const [house, setHouse] = useState(null);
    const [boarders, setBoarders] = useState([]);
    
    useEffect(() => { 
        //set house name
        const houseName = user.house.house;
            
        //look up boarders by id to get usernames
        const usernames = user.house.boarders.map(boarderId => {
            return axios.get(`/users/${boarderId}`).then(res => {
                const username = res.data.data.doc.username;
                return username; 
            }).catch(err => console.log(err)); 
        });

        Promise.all(usernames).then(res => setBoarders(res));
        setHouse(houseName); 

    }, [user])

    return {
        house,
        boarders
    }
}