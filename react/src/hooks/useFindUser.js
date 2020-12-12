import { useState, useEffect } from 'react';
import axios from 'axios';
 
export default function useFindUser() {
const [userStatus, setUserStatus] = useState(null); // used to be {}
const [houseTags, setHouseTags] = useState(null);
const [isLoading, setLoading] = useState(true);
 
useEffect(() => {
    async function useFindUser() {
          await axios.get('/user')
            .then(res => { 
                console.log(res);
                const user = res.data.currentUser;
                setUserStatus(user);
        return axios.get(`/tags/h/${user.house._id}`);
        }).then(res => {
                const tags = res.data.data.results
                setHouseTags(tags);
                setLoading(false); 
        }).catch(err => console.log(err));
    }
    useFindUser();

    }, []);
                    
    return {
        userStatus,
        houseTags,
        isLoading
    }
}






