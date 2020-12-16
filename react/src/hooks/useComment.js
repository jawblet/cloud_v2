import { useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export default function useComment( post ) {
    const { user } = useContext(UserContext);

    const state = { 
        postComments: [],
        comment: ''
    }

    const reducer = (state, action) => {
        switch(action.type) {
            case "getComments": 
                return { ...state, postComments: action.c};
            case "writeComment":
                return { ...state, comment: action.comment};
            case "addComment":
                return { ...state, postComments: state.postComments.concat(action.newComment)};
            case "deleteComment":
                return { ...state, postComments: state.postComments.filter(el => el._id !== action.id)};
            default: 
                return state;
        }
    };

    const [data, dispatch] = useReducer(reducer, state);

//get post's comments
    useEffect(() => {
        async function getPostTags() {
           await axios.get(`/comments/${post}`)
                .then(res =>{
                    const c = res.data.data.comments;
                    dispatch({type: "getComments", c}) 
            }).catch(err => console.log(err));
        };
        getPostTags();
    }, [post]);

    //write comment
    const handleChange = (e) => {
        dispatch({type: "writeComment", comment: e.target.value});
    }

    //add comment on enter press 
    const handleKeyDown = (e) => {
        if(e.keyCode === 13 && e.target.value !== '') { //submit comment if enter press and comment is not empty
            axios.post('/comments', {
                post,
                user,
                comment: e.target.value
            }).then(res => {
                const newComment = res.data.data.doc;
                dispatch({type: "addComment", newComment})
                dispatch({type: "writeComment", comment: ''});   
            })
            
       }
    }

    //delete comment 
    const deleteComment = (e) => {
        const id = e.currentTarget.dataset.id;
       axios.delete(`/comments/${id}`)
        .then(() => {
           dispatch({type: "deleteComment", id })
        }).catch(err => console.log(err));
    }

    return {
        data,
        handleChange,
        handleKeyDown,
        deleteComment
    }
}