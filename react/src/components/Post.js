import React, { useState, useEffect, useRef, useContext } from 'react';
//import Preview from './Preview'
import { Link, useLocation } from 'react-router-dom';
import { Editor } from 'draft-js';
import usePosts from '../hooks/usePosts'; 
import { UserContext } from '../hooks/UserContext';

  
export default function Post({ post, view, openPost }) { 
    const { globalTags } = useContext(UserContext);

    let location = useLocation();
    const [preview, showPreview] = useState(false);
    const editRef = useRef(null);

    const { displayNoteBody, editorState, setEditorState, onNoteChange } = usePosts();

    useEffect(() => {
        if(post.type === 'note') { 
            displayNoteBody(post);
        }
    }, [post])

    return(
        <div className="post" key={post._id} data-id={post._id}
            onMouseEnter={() => showPreview(true)} onMouseLeave={() => showPreview(false)}>                      
            <div className="post__header">
                <h4 className="lightest">{post.user.username}</h4>  <h4 className="lightest">{post.date}</h4>
            </div>
            <Link to={{pathname: `${location.pathname}/${post._id}`,
                       state: {post: post }}}
                       className="post__body">
                <div onClick={openPost}>
                    {post.type === 'note' 
                    ?
                        <div className="post__body__note">
                            <Editor readOnly={true} 
                            editorState={editorState} ref={editRef}
                            setEditorState={setEditorState}
                            onChange={onNoteChange} />
                            <span className="post__body__fade"></span>   
                        </div>   
                        : 
                        <div> Link </div>         
                    }
                </div>
            </Link>
            <div className="post__tags">
                {(post.tags.length > 0) 
                ? post.tags.map(el => {
                    return (
                    <h4 key={el.tag}>
                        {el.tag}
                    </h4>
                    )
                })
                : <h4 className="lightest">No tags</h4> }
            </div>
        </div>
    )
}
