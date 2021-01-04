import { useState,  useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext'; 
import { EditorState, convertFromRaw } from 'draft-js';

export default function useThread(id) {
    const { user } = useContext(UserContext);

    //post state 
    const [loading, isLoading] = useState(true); 
    const [comments, setComments] = useState(null);

    //GET COMMENTS 
    const getComments = async () => {
        return axios.get(`/comments/${id}`)
            .then(res => {
            const c = res.data.data.comments;
            setComments(c);
            isLoading(false);
        }).catch(err => console.log(err));
    }

    //POST COMMENTS
    const addComment = async (comment) => {
        return axios.post('/comments', {
            post: id,
            user,
            comment
        }).then(res => {
            console.log(res); 
            const newComment = res.data.data.doc;
        })
    }

    //operations
    const handleAddComment = async (comment) => {
        await addComment(comment);
        await getComments();
    }


    useEffect(() => {
        async function loadComments() {
            await getComments();
        }
        loadComments();
    }, []);

    return {
    comments,
    loading,
    handleAddComment
    }
}