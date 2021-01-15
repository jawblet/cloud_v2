import React, { useEffect, useRef } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import InlineButton from '../components/btns/InlineButton';
import { Editor, convertToRaw } from 'draft-js';
import EditSidebar from './EditSidebar'; 
import { LinkDetail } from '../components/posts/LinkPreview';
import useEditPost from '../hooks/posts/useEditPost'; 
import Toolbar from '../components/btns/Toolbar';
import { VscClose, VscEdit } from 'react-icons/vsc';
import { CSSTransition } from 'react-transition-group';
import useManagePosts from '../hooks/posts/useManagePosts';
import usePostDetail from '../hooks/posts/usePostDetail';
import { getUrlBase } from '../pages/layer/layer_data';

export default function Edit({ openPost }) { 
    const nodeRef = useRef(null);
    const params = useParams();
    const location = useLocation();

    const { post, tags, loading, getPostDetail } = usePostDetail(params.postId);
    
    useEffect(() => { 
       getPostDetail();
    }, [params.postId]);
 
    const { displayNoteBody, 
            editorState, 
            setEditorState, 
            onNoteChange, 
            editNote, 
            isReadOnly,
            handleKeyCommand,
            mapKeyToEditorCommand,
            toggleInlineStyle,
            toggleBlockType,
            setFocus,
            editRef } = useEditPost();

    const { updatePost, handleDeleteDetail } = useManagePosts();

    useEffect(() => {
        if(post && (post.type === 'note')) {
            displayNoteBody(post); 
        } 
    }, [post]);

    async function handleUpdatePost() {
        const data = editorState.getCurrentContent();
        const newNote = JSON.stringify(convertToRaw(data));
        editNote();
        await updatePost(newNote, post._id); 
    };

    if(loading) {
        return null; 
    }

    return (
        <div className="modal__background">
            <div className="edit">
                <Link to={getUrlBase(location.pathname)}>
                    <div className="modal__X" onClick={openPost}> <VscClose className="icon icon__btn"/></div>
                </Link> 
                <div className="edit__content">
                        <EditSidebar post={post} tags={tags} handleDeleteDetail={handleDeleteDetail}/> 
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
                            <InlineButton name={"save changes"} handleClick={handleUpdatePost}/>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

