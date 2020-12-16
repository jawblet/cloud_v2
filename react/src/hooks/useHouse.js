import { useState, useContext, useEffect } from 'react';
import { UserContext } from './UserContext'
import axios from 'axios';

export default function useHouse() {
    const { user } = useContext(UserContext);

    const [house, setHouse] = useState(null);
    const [boarders, setBoarders] = useState([]);
    
    useEffect(() => {
            //set house name
            const houseId = user.house;
            const houseName = user.house.house;
            setHouse(houseName); 
            //look up boarders by id to get usernames
            user.house.boarders.forEach(async boarderId => {
               await axios.get(`/users/${boarderId}`).then(res => {
                    console.log(res.data.data.doc.username);
                    const newBoarder = res.data.data.doc.username;
                    setBoarders(boarders.concat(newBoarder));
                })
            });
    
    }, [user])

    return {
        house,
        boarders
    }
}