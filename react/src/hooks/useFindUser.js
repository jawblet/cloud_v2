import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFindUser() {
const [userStatus, setUserStatus] = useState('');
const [isLoading, setLoading] = useState(true);

    useEffect(() =>{
        try {
            axios({
                method: 'GET',
                url: '/user'
            }).then(res => {
                setUserStatus(res.data.currentUser);
                setLoading(false);
            })
        } catch(err) {
            console.log(err);
        }
    }, []);
    
    return {
        userStatus,
        isLoading
    }
}