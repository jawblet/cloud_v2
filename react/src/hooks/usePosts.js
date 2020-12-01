import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export default function usePosts(room) {
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState(null);
    const [loading, isLoading] = useState(true);
 
    //get house posts by room 
    useEffect(() => {
        console.log('i was called');
        try {
            axios({
                method: 'GET',
                url: `/posts/h/${user.house._id}/${room}` 
            }).then(res => {
                //console.log(res.data.data.results);
                setPosts(res.data.data.results);
                isLoading(false);
            })
        } catch(err) {
            console.log(err)
        }
    }, [room]);  

    return {
        posts,
        loading
    }
}