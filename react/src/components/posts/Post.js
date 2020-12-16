import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Editor } from 'draft-js'; 
import { LinkCard } from './LinkPreview';
import usePosts from '../../hooks/usePosts'; 
import { VscEllipsis } from 'react-icons/vsc';
  
export default function Post({ post, openPost }) { 
    let location = useLocation();
    const editRef = useRef(null);  
     
    const { displayNoteBody, editorState, setEditorState, onNoteChange } = usePosts();
 
    useEffect(() => {
        if(post.type === 'note') { 
            displayNoteBody(post); 
        } 
    }, [post]); 
 
    return(
        <div className="post25__wrapper">
        <h4 className="post25__user">{post.user.username}</h4> 
            <div className="post25" key={post._id} data-id={post._id} >                      
                <div className="post25__header">
                    <VscEllipsis className="icon icon__btn"/>
                </div>
                <Link to={{pathname: `${location.pathname}/${post._id}`, 
                        state: {post: post }}} onClick={(e) => openPost(e)}
                        className="post25__body" data-id={post._id}>
                        {post.type === 'note' 
                        ?
                            <div className="post25__body__note">
                                <Editor readOnly={true} 
                                editorState={editorState} ref={editRef}
                                setEditorState={setEditorState}
                                onChange={onNoteChange} />
                                <span className="post25__body__fade"></span>   
                            </div>   
                            : 
                            <div className="post25__body__link"> 
                                <LinkCard link={post.content}/>
                            </div>         
                        }
                </Link>
            </div>
        </div>
    )
}

//