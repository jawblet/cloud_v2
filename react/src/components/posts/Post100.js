import React, { useRef, useEffect } from 'react';
import { Editor } from 'draft-js'; 
import { LinkPreview } from './LinkPreview';
import usePosts from '../../hooks/usePosts'; 
import { VscEllipsis } from 'react-icons/vsc';

export default function Post100({ post }) {
    const { displayNoteBody, editorState, setEditorState, onNoteChange } = usePosts();
    const editRef = useRef(null); 

    console.log(post);

    useEffect(() => {
        if(post.type === 'note') { 
            displayNoteBody(post);
        }
    }, [post])

    return(
        <div className="post100">
            <div className="post100__header">
                <h4 className="lightest">{post.user.username}</h4>  
                <div className="flex alignCenter">
                    <h4 className="lightest">{post.date}</h4>
                    <VscEllipsis className="icon icon__btn post100__editBtn"/>
                </div>
            </div>
            <div className="post100__body">
                {post.type === 'note' 
                    ?
                        <div className="post100__body__note">
                            <Editor readOnly={true} 
                            editorState={editorState} ref={editRef}
                            setEditorState={setEditorState}
                            onChange={onNoteChange} />
                        </div>   
                        : 
                        <div className="post__body__link"> 
                            <LinkPreview link={post.content} />
                        </div>         
                    }
                </div> 
                <div className="post100__tags">
                    {post.tags && 
                    <> <h4>tags:</h4>
                        {post.tags.map(tag => {
                            return (
                            <h4 key={tag._id}>{tag.tag}</h4>
                            )
                        })}
                    </>
                    }
                </div>
        </div>
    )
}