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
const [r_loading, setRoomLoading] = useState(true);
const [room, setRoom] = useState(null);

    //GET ROOM
    const getRoom = async(room) => {
        await axios.get(`/houses/${house}`)
                .then(res => {
                    const rooms = res.data.data.doc.rooms;
                    const currentRoom = rooms.find(el => el.slug === room);
                    setRoom(currentRoom);
                    setRoomLoading(false);
        }).catch(err => console.log(err));        
    }

    //GET ALL POSTS
    const getRoomPosts = async(roomId) => {
        await axios.get(`/posts/h/${house}/${roomId}`)
                    .then(res => {
                    const posts = res.data.data.results;
                    setPosts(posts);
                    setLoading(false);
        })
    };

      //UPDATE 
      const updatePost = async(note, id) => {
        await axios.put(`/posts/${id}`, {
            content: note
        }).catch(err => console.log(err));
    };

    //DELETE 
    const deletePost = async (id) => {
        await axios.delete(`/posts/${id}`)
                .then((res) => {
                    //console.log(res);
                    const state = [...posts];
                    const newState = state.filter(el => el._id !== id);
                    setPosts(newState); 
                }).catch(err => console.log(err));
    };

    //functions 
    function handleGetPosts(roomId) { 
        getRoomPosts(roomId);   
    }

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
        room,
        r_loading,
        p_loading,
        posts,
        handleGetPosts,
        getRoomPosts,
        openPost,
        handleUpdatePost,
        handleDeletePost,
        getRoom
    }
}