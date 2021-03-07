import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function useLayerPosts() { 
const { user } = useContext(UserContext);
const house = user.house._id; 

//init state 
const [posts, setPosts] = useState(null);
const [loading, setLoading] = useState(true);

    //GET ALL POSTS FOR LAYER
    const getLayerPosts = async (layerId) => {
        return axios.get(`/posts/h/${house}/${layerId}`)
                    .then(res => {
                    const posts = res.data.data.results;
                    setPosts(posts); 
                    setLoading(false);
                    return;
        }).catch(err => console.log(err))
    };

    // GET ALL POSTS FOR PATH 
    const getPathPosts = async (pathId) => {
        return axios.get(`/posts/details/${house}/${pathId}`) 
        .then(res => {
            const { docs } = res.data.data.posts;
            setPosts(docs); 
            setLoading(false);
        }).catch(err => console.log(err))
    }

    //GET ALL POSTS FOR HOUSE
    const getHousePosts = async() => {
        return axios.get(`/posts/grid/${house}`).then(res => {
            console.log(res);
            const { posts } = res.data;
            setPosts(posts); 
            setLoading(false);
        }).catch(err => console.log(err));
    }

    return {
        loading,
        posts,
        getLayerPosts,
        getPathPosts,
        getHousePosts
    }
}
