import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function useLayerPosts() {
const { user } = useContext(UserContext); 
const house = user.house._id; 

//init state 
const [posts, setPosts] = useState(null);
const [loading, setLoading] = useState(true);

    //GET ALL POSTS
    const getLayerPosts = async (layerId) => {
        return axios.get(`/posts/h/${house}/${layerId}`)
                    .then(res => {
                    const posts = res.data.data.results;
                    console.log(posts);
                    setPosts(posts); 
                    setLoading(false);
        }).catch(err => console.log(err))
    };

    return {
        loading,
        posts,
        getLayerPosts
    }
}


//layerId from being passed as prop --> passed as argument 
