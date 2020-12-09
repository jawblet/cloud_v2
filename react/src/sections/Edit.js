import React, { useEffect, useRef } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import TagPreview from '../atoms/TagPreview';
import InlineButton from '../components/btns/InlineButton';
import { VscClose, VscEdit } from 'react-icons/vsc';
import { Editor, convertToRaw } from 'draft-js';
import { LinkDetail } from '../components/posts/LinkPreview';
import usePosts from '../hooks/usePosts'; 
import InlineComment from '../components/InlineComment';
import useComment from '../hooks/useComment';
import CommentList from '../components/CommentList';

export default function Edit( {openPost} ) {
    const params = useParams();
    const location = useLocation(); 
    const post = location.state.post;
    const editRef = useRef(null); 

    const { displayNoteBody, editorState, 
            setEditorState, onNoteChange, 
            postDetail, editNote, isReadOnly,
            saveUpdate  } = usePosts();

    const { data, handleKeyDown, handleChange, deleteComment } = useComment(post._id);

    useEffect(() => {
        if(post.type === 'note') { 
            displayNoteBody(post);
        }
    }, [])

    useEffect(() => {
        if(!isReadOnly) { //set note in focus if it's being edited 
        editRef.current.focus();
        }
    }, [isReadOnly]);

    const updatePost = () => {
        const data = editorState.getCurrentContent();
        const newNote = JSON.stringify(convertToRaw(data));
        saveUpdate(newNote, post._id);
    };
    
    return(
        <div className="modal__background">
            <div className="edit">
                <Link to={`/home/${params.room}`}>
                    <div className="modal__X" onClick={openPost}> 
                        <VscClose className="icon icon__btn"/>
                    </div>
                </Link>
                <div className="edit__content">
                    <div className="edit__sidebar">
                        <div className="edit__metadata">
                            <h4 className="lightest">created by</h4>
                            <h4 className="light">
                                {post.user.username}
                            </h4>
                        </div>
                        <div className="edit__metadata">
                            <h4 className="lightest">created on</h4>
                            <h4 className="light">
                                {post.date}
                            </h4>
                        </div>
                        <div className="edit__metadata">
                        {post.tags.length > 0 
                            ? <>
                            <h4 className="lightest">tags</h4>
                               { post.tags.map(tag => { 
                                   return ( 
                                    <TagPreview tag={tag} key={tag._id}/> 
                                    ) 
                                })}
                            </>
                            : <h4 className="lightest">no tags</h4>
                            }
                        </div>
                        <div className="edit__metadata">
                            <CommentList postComments={data.postComments} deleteComment={deleteComment}/>
                        </div>
                            <InlineComment handleChange={handleChange} handleKeyDown={handleKeyDown} comment={data.comment}/>
                    </div>
                    <div className="edit__body">
                        <div className="edit__body__edit">
                            <h4 className="lightest">{post.type}:</h4> 
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

