import React, { useEffect, useContext, useState, useReducer } from 'react'; 
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
import { EditorState, convertFromRaw, CompositeDecorator } from 'draft-js';

export default function usePosts(room) {
    let history = useHistory();
    let location = useLocation();
    const { user, globalTags } = useContext(UserContext);
    const tags = globalTags;
    let tagNames;
    if(tags && tags.length > 0) { tagNames = tags.map(el => el.tag); }
     
   // const [posts, setPosts] = useState([]);
    const state = {
        posts: []
    }

    const [loading, isLoading] = useState(true);
    const [isReadOnly, setEditable] = useState(true);

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onNoteChange = (editorState) => {
            setEditorState(editorState);   
        }

    const reducer = (state, action) => {
        switch(action.type) {
            case "setPosts": 
                return {...state, posts: action.p};
            case "deletePost":
                console.log(state.posts);
                return {posts: state.posts.filter(el => el._id !== action.postId)};
            default:
                return state;
        }
    };
 
    const [data, dispatch] = useReducer(reducer, state);

//set posts by house id
    useEffect(() => {
        async function getPostsByRoom() {
            if(room !== undefined) {
                await axios.get(`/posts/h/${user.house._id}/${room}`)
                .then(res => {  
                    console.log('this was reset');
                    const p = res.data.data.results;
                    dispatch({type: "setPosts", p});
                    isLoading(false); 
        }).catch(err => console.log(err)); 
    }
        } 
        getPostsByRoom();
    }, [room]); //user, room

//delete post 
const deletePost = (e) => {
        const postId = e.currentTarget.dataset.id;
        axios.delete(`/posts/${postId}`)
            .then(res => {
                console.log(res);
                dispatch({type: "deletePost", postId})
    }).catch(err => console.log(err)); 
}

//select item from edit menu 
const selectItem = (e) => {
    const action = e.currentTarget.dataset.label;
    switch(action) {
        case "delete": deletePost(e); 
        break;
        case "edit": openPost(e); // open post detail 
        default: return null;
    }
}

//open post detail pg
const openPost = (e) => {
    const postId = e.currentTarget.dataset.id;
    history.push(`${location.pathname}/${postId}`);
}

//enable editing for note detail  
const editNote = () => {
    setEditable(!isReadOnly);
}

//update note detail 
const saveUpdate = async (newNote, id) => {
    console.log(id);
    await axios.put(`/posts/${id}`, {
        content: newNote
    }).then(() => {
        setEditable(true);
    });
}

//display notes on tiles and detail pg 
const displayNoteBody = async (post) => {
    const contentState = convertFromRaw(JSON.parse(post.content));
    let newEditorState;

    if (tagNames) { // decorate tags if tags exist/have been retrieved 
        const TAGS_REGEX = new RegExp(tagNames.join("|"), "gi");
        const findWithRegex = (regex, contentBlock, callback) => {
            const text = contentBlock.getText();
            let matchArr, start, end;
            while ((matchArr = regex.exec(text)) !== null) {
                start = matchArr.index;
                end = start + matchArr[0].length;
                callback(start, end); 
            }
        }

        function findTags(contentBlock, callback, contentState) {
            findWithRegex(TAGS_REGEX, contentBlock, callback);
        };

        const highlightSpan = (props) => {
            const tag = props.decoratedText.toLowerCase();
            const c = tags.find(obj => obj.tag === tag).color;   
            return (
                <span className="editorTag" style={{ backgroundColor: c }}>
                    {props.children}
                </span>
                )}

            const decorator = new CompositeDecorator([
                { strategy: findTags,
                component: highlightSpan }
            ]);

        newEditorState = EditorState.createWithContent(contentState, decorator); 
        return setEditorState(newEditorState);

        } else { // without tags, just fill content 
            console.log('no tags');
            newEditorState = EditorState.createWithContent(contentState); 
           return setEditorState(newEditorState);
        } 
    }

    return {
        data,
        tags,
        loading,
        displayNoteBody,
        editorState,
        setEditorState,
        onNoteChange,
        selectItem,
        openPost,
        deletePost,
        editNote,
        isReadOnly,
        saveUpdate
    }
}

