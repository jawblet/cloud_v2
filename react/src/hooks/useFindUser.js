import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFindUser() {
const [userStatus, setUserStatus] = useState('');

    useEffect(() =>{
        try {
            axios({
                method: 'GET',
                url: '/user'
            }).then(res => {
                console.log(res.data);
            })
        } catch(err) {
            console.log(err);
        }
    }, []);
    
    return{
        userStatus
    }
}