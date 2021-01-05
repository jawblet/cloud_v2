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
import Toolbar from '../components/btns/Toolbar';
//import { Loading } from '../components/Loading';
import { VscClose, VscEdit, VscTrash } from 'react-icons/vsc';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

export default function Edit({ openPost }) {
    const nodeRef = useRef(null);
    const params = useParams();
    const postId = params.postId; 
    const [post, setPost] = useState(null);
    const [tags, setTags] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        axios.get(`/posts/${postId}`).then(res => {
            const post = res.data.data.doc;
            setPost(post);
            setTags(groupBy(post.tags, 'tag'));
            setLoading(false);
        })
    }, [postId]);
 

    const { displayNoteBody, 
            editorState, 
            setEditorState, 
            onNoteChange, 
            deletePost, 
            editNote, 
            isReadOnly,
            handleKeyCommand,
            mapKeyToEditorCommand,
            toggleInlineStyle,
            toggleBlockType,
            setFocus,
            editRef } = useEditPost();

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
        return null;
    }
    return (
        <div className="modal__background">
            <div className="edit">
                <Link to={`/${params.room}`}>
                    <div className="modal__X" onClick={openPost}> <VscClose className="icon icon__btn"/></div>
                </Link> 
                <div className="edit__content">
                    <div className="edit__sidebar">
                        <EditSidebar post={post} tags={tags}/> 
                        <div className="edit__metadata">
                            <CommentList postComments={data.postComments} deleteComment={deleteComment}/>
                        </div>
                            <InlineComment handleChange={handleChange} handleKeyDown={handleKeyDown} comment={data.comment}/>
                            <VscTrash className="icon icon__btn icon--warning editPost__trash" data-id={post._id} onClick={deletePost}/>
                    </div>
                    <div className="editPost">
                        <div className="editPost__header">
                            <CSSTransition 
                                in={!isReadOnly} timeout={350} 
                                nodeRef={nodeRef} classNames="fade"
                                unmountOnExit>
                                <span ref={nodeRef}>
                                    <Toolbar editorState={editorState}
                                        onToggleInline={toggleInlineStyle}
                                        toggleBlockType={toggleBlockType}
                                        setFocus={setFocus}
                                        addTag={false}/> 
                                </span>
                                    </CSSTransition>
                                <VscEdit className={`icon icon__btn editPost__pen ${isReadOnly ? '' : 'icon--active'}`} onClick={editNote}/>
                        </div>
                        {post.type === 'note' 
                        ?
                            <div className={`editPost__noteDetail ${isReadOnly ? '' : 'active'}`}>
                                <Editor readOnly={isReadOnly} 
                                editorState={editorState} ref={editRef}
                                setEditorState={setEditorState}
                                handleKeyCommand={handleKeyCommand}
                                mapKeyToEditorCommand={mapKeyToEditorCommand}
                                onChange={onNoteChange} />
                            </div>   
                            : 
                            <div className='editPost__linkDetail'>
                                <LinkDetail link={post.content}/> 
                            </div>  
                        }
                        <div className={`editPost__save ${isReadOnly ? '' : 'active'}`}>
                            <InlineButton name={"save changes"} handleClick={updatePost}/>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/*
if(loading) {
        return (
            <Loading/>
        )
    }
*/