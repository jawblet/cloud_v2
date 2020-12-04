import { useState, useEffect } from 'react';
import axios from 'axios';
 
export default function useFindUser() {
const [userStatus, setUserStatus] = useState({});
const [houseTags, setHouseTags] = useState(null);
const [isLoading, setLoading] = useState(true);
 
useEffect(() => {
     axios.get('/user') 
            .then(res => {
                const user = res.data.currentUser;
                console.log(user);
                setUserStatus(user);
           return axios.get(`/tags/h/${user.house._id}`);
        }).then(res => {
                const tags = res.data.data.results
                setHouseTags(tags);
                setLoading(false);
        }).catch(err => console.log(err));
    }, []);
                    
    return {
        userStatus,
        houseTags,
        isLoading
    }
}

/*
    useEffect(() =>{
        try {
            axios({
                method: 'GET',
                url: '/user'
            }).then(res => {
                const user = res.data.currentUser
                setUserStatus(user);
                setLoading(false);
                if(user) {
                    axios.get(`/tags/h/${user.house._id}`).then(res => {
                    console.log(res.data.data.results);
                    const tags = res.data.data.results;
                    setHouseTags(tags);
                    })
                }
            })
        } catch(err) {
            console.log(err);
        }
    }, []); 
 */