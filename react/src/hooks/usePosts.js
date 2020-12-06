import React, { useEffect, useContext, useState } from 'react'; 
import axios from 'axios';
import { UserContext } from './UserContext';
import { EditorState, convertFromRaw, CompositeDecorator } from 'draft-js';

export default function usePosts(room) {
    const { user, globalTags } = useContext(UserContext);
    const tags = globalTags;
    let tagNames;
    if(tags && tags.length > 0) {
        tagNames = tags.map(el => el.tag);
    }
    
    const [posts, setPosts] = useState(null);
    const [loading, isLoading] = useState(true);
    const [postDetail, showPostDetail] = useState(false);
    const [isReadOnly, setEditable] = useState(true);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onNoteChange = (editorState) => {
        setEditorState(editorState);  
      }
 
//console.log(user);      
//get posts by room + house, get tags by house
useEffect(() => {
   async function getPostsByRoom() {
    if(user.house && user.house.boarders) {
        await axios.get(`/posts/h/${user.house._id}/${room}`)
        .then(res => {  
            setPosts(res.data.data.results); //set posts
            isLoading(false); 
        }).catch(err => console.log(err));
    } else {     //get posts @ reg and login before house is populated 
        await axios.get(`/posts/h/${user.house}/${room}`)
        .then(res => {  
            setPosts(res.data.data.results); //set posts
            isLoading(false); 
            }).catch(err => console.log(err));
        }
    }
    getPostsByRoom();
    }, [user, room]); 

//open post detail pg
const openPost = () => {
    showPostDetail(!postDetail);
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
    }).then(res => {
        console.log(res);
        setEditable(true);
    });
}

//display notes on tiles and detail pg 
const displayNoteBody = async (post) => {
    const contentState = convertFromRaw(JSON.parse(post.content));
    let newEditorState;

    if (tagNames) { // decorate tags if tags exist/have been retrieved 
        console.log('yes tags');
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
        posts,
        tags,
        loading,
        displayNoteBody,
        editorState,
        setEditorState,
        onNoteChange,
        openPost,
        postDetail,
        editNote,
        isReadOnly,
        saveUpdate
    }
}
