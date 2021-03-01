import { useState, useContext } from 'react'; 
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function usePathPosts() {
    const { user } = useContext(UserContext);
    const house = user.house._id;

    const getPathPosts = async (pathId) => {
        await axios.get(`/posts/details/${house}/${pathId}`) 
        .then(res => {
            console.log(res);
            const { tag, posts, postCount, tagCount } = res.data.data;
        }).catch(err => console.log(err))
    }

    return {
        getPathPosts
    }
}