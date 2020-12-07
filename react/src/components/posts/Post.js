import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Editor } from 'draft-js'; 
import { LinkCard } from './LinkPreview';
import usePosts from '../../hooks/usePosts'; 
import { VscEllipsis } from 'react-icons/vsc';
  
export default function Post({ post, openPost }) { 
    let location = useLocation();
    const editRef = useRef(null); 
    console.log(post);
    
    const { displayNoteBody, editorState, setEditorState, onNoteChange } = usePosts();
 
    useEffect(() => {
        if(post.type === 'note') { 
            displayNoteBody(post);
        }
    }, [post])

    return(
        <div className="post25">
        <h4 className="lightest">{post.user.username}</h4> 
        <div className="post" key={post._id} data-id={post._id} >                      
            <div className="post__header">
                <VscEllipsis className="icon icon__btn"/>
            </div>
            <Link to={{pathname: `${location.pathname}/${post._id}`,
                       state: {post: post }}} onClick={openPost}
                       className="post__body">
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
                        <div className="post__body__link"> 
                             <LinkCard link={post.content}/>
                        </div>         
                    }
            </Link>
        </div>
        </div>
    )
}

//