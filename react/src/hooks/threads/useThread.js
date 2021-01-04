import { useState, useEffect } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import axios from 'axios';

export default function useThread(id) {
    //post state 
    const [loading, isLoading] = useState(true); 
    const [metadata, setMetadata] = useState(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    //GET POST 
    const getPost = async () => {
        return axios.get(`/posts/${id}`).then(res => {
            const post = res.data.data.doc;
            setMetadata( {title: post.title, author: post.user.username, date: post.createdOn} );
            const contentState = convertFromRaw(JSON.parse(post.content)); 
            let newEditorState = EditorState.createWithContent(contentState); 
            setEditorState(newEditorState);
            return isLoading(false);
            });
    } 
    
    useEffect(() => {
        async function getThread() {
            await getPost();
        }
        getThread();
    }, []);

    return {
        metadata,
        editorState,
        loading
    }
}