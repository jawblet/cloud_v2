import { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';

export default function useRoom(currentRoom) {
const { user } = useContext(UserContext); 
const house = user.house._id;
let history = useHistory();
let location = useLocation();

//init state 
const [posts, setPosts] = useState(null);
const [p_loading, setLoading] = useState(true);

    //UPDATE 
    const updatePost = async(note, id) => {
        await axios.put(`/posts/${id}`, {
            content: note
        }).catch(err => console.log(err));
    };

    //GET ALL 
    const getRoomPosts = async(room) => {
        await axios.get(`/posts/h/${house}/${room}`)
                    .then(res => {
                    console.log(res);
                    const posts = res.data.data.results;
                    setPosts(posts);
                    setLoading(false);
        })
    };

    //DELETE 
    const deletePost = async (id) => {
        await axios.delete(`/posts/${id}`)
                .then((res) => {
                    console.log(res);
                    const state = [...posts];
                    const newState = state.filter(el => el._id !== id);
                    setPosts(newState); 
                }).catch(err => console.log(err));
    };

    //functions 
    function handleDeletePost(e) {
        const id = e.target.dataset.id;
        deletePost(id);
        getRoomPosts(currentRoom);
    }

    function handleUpdatePost(content, postId) {
       updatePost(content, postId);
    }

    function openPost(e) {
        const postId = e.currentTarget.dataset.id;
        history.push(`${location.pathname}/${postId}`);
    }

    return {
        p_loading,
        posts,
        getRoomPosts,
        openPost,
        handleUpdatePost,
        handleDeletePost
    }
}