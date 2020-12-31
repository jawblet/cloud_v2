import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import InlineButton from '../components/btns/InlineButton';
import { Editor, convertToRaw } from 'draft-js';
import EditSidebar from './EditSidebar'; 
import { LinkDetail } from '../components/posts/LinkPreview';
import InlineComment from '../components/InlineComment';
import CommentList from '../components/CommentList';
import useEditPost from '../hooks/posts/useEditPost'; 
import useComment from '../hooks/posts/useComment';
import useLayerPosts from '../hooks/layers/useLayerPosts';
import groupBy from 'lodash/groupBy';
//import Toolbar from '../../components/btns/Toolbar';
import { VscClose, VscEdit, VscTrash } from 'react-icons/vsc';
import axios from 'axios';


export default function Edit({ openPost }) {
    const params = useParams();
    const postId = params.postId; 
    const [post, setPost] = useState(null);
    const [tags, setTags] = useState(null);
    const [loading, setLoading] = useState(true);
    const editRef = useRef(null); 

    useEffect(() => { 
        axios.get(`/posts/${postId}`).then(res => {
            const post = res.data.data.doc
            setPost(post);
            setTags(groupBy(post.tags, 'tag'));
            setLoading(false);
        })
    }, [postId]);
 

    const { displayNoteBody, editorState, 
            setEditorState, onNoteChange, 
            deletePost, editNote, isReadOnly } = useEditPost();

    const { handleUpdatePost } = useLayerPosts();

    const { data, handleKeyDown, handleChange, deleteComment } = useComment(postId);

    useEffect(() => {
        if(post) {
            if(post.type === 'note') { 
                displayNoteBody(post); 
            }
        } 
    }, [post])

    useEffect(() => {
        if(!isReadOnly) { //set note in focus if it's being edited 
        editRef.current.focus();
        }
    }, [isReadOnly]);

    const updatePost =() => {
        const data = editorState.getCurrentContent();
        const newNote = JSON.stringify(convertToRaw(data));
        handleUpdatePost(newNote, post._id, params.room);
        editNote();
    };

    if(loading) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <div className="modal__background">
            <div className="edit">
                <Link to={`/home/${params.room}`}>
                    <div className="modal__X" onClick={openPost}> 
                        <VscClose className="icon icon__btn"/>
                    </div>
                </Link>
                <div className="edit__content">
                    <div className="edit__sidebar">
                        <EditSidebar post={post} tags={tags}/>
                        <div className="edit__metadata">
                            <CommentList postComments={data.postComments} deleteComment={deleteComment}/>
                        </div>
                            <InlineComment handleChange={handleChange} handleKeyDown={handleKeyDown} comment={data.comment}/>
                    </div>
                    <div className="edit__body">
                        <div className="edit__body__edit">
                            <VscTrash className="icon icon__btn icon--warning" data-id={post._id} onClick={deletePost}/>
                            <VscEdit className={`icon icon__btn ${isReadOnly ? '' : 'icon--active'}`} onClick={editNote}/>
                        </div>
                        {post.type === 'note' 
                        ?
                            <div className={`edit__body__noteDetail ${isReadOnly ? '' : 'active'}`}>
                                <Editor readOnly={isReadOnly} 
                                editorState={editorState} ref={editRef}
                                setEditorState={setEditorState}
                                onChange={onNoteChange} />
                            </div>   
                            : 
                            <div className='edit__body__linkDetail'>
                                <LinkDetail link={post.content}/> 
                            </div>  
                        }
                        <div className={`edit__body__save ${isReadOnly ? '' : 'active'}`}>
                            <InlineButton name={"save changes"} handleClick={updatePost}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

