import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function useLayerPosts(layerId) {
const { user } = useContext(UserContext); 
const house = user.house._id; 

//init state 
const [posts, setPosts] = useState(null);
const [loading, setLoading] = useState(true);

    //GET ALL POSTS
    const getLayerPosts = async () => {
        return axios.get(`/posts/h/${house}/${layerId}`)
                    .then(res => {
                    const posts = res.data.data.results;
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





/*
const [r_loading, setRoomLoading] = useState(true);
const [room, setRoom] = useState(null);
 
 //handle in-hook functions 
    async function handleGetPosts() { 
       const room = await getRoom(currentRoom);
       await getRoomPosts(room.id);   
    }

     //GET ROOM
    const getRoom = async (room) => {
        return axios.get(`/houses/${house}`)
                .then(res => {
                    const rooms = res.data.data.doc.rooms;
                    const newRoom = rooms.find(el => el.slug === room);
                    setRoom(newRoom);
                    setRoomLoading(false);
                    return newRoom;
        }).catch(err => console.log(err));        
    }

            handleGetPosts,
        getRoom,

*/