import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export default function usePosts(room) {
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState(null);
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        try {
            axios({
                method: 'GET',
                url: `/posts/h/${user.house}/${room}` //need a leading slash, otherwise `home` is on the req path -- ? 
            }).then(res => {
                console.log(res.data.data.results);
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