import React, { useRef, useEffect, useState } from 'react';
import { Editor } from 'draft-js'; 
import { LinkPreview } from './LinkPreview';
import usePosts from '../../hooks/usePosts'; 
import { VscEllipsis } from 'react-icons/vsc';
import BasicSelectMenu from '../menus/BasicSelectMenu'; 
 
export default function Post100({ post, toggleMenu, menu, index, revertAll }) { 
    const { displayNoteBody, 
            editorState, 
            setEditorState, 
            onNoteChange, 
            selectItem } = usePosts();

    const editRef = useRef(null); 

    const options=['edit', 'delete'];

    useEffect(() => {
        if(post.type === 'note') { 
            displayNoteBody(post);
        } 
        return null
    }, [post])

    //set hover effect for tags 
    const [hover, setHover] = useState(null);
    return ( 
        <>
        <div className="post100">
            <div className="post100__header">
                <h4 className="lightest">{post.user.username}</h4>  
                <div className="post100__header__edit">
                    <h4 className="lightest">{post.date}</h4>
                    <VscEllipsis className="icon icon__btn post100__editBtn" data-id={index} onClick={toggleMenu}/>
                     <div className="post100__header__editMenu">
                        <BasicSelectMenu 
                            toggleMenu={toggleMenu}
                            show={menu[index]}
                            items={options} 
                            selectItem ={selectItem} 
                            childData={post._id}
                            revertAll={revertAll}
                            />
                    </div>
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
                    {post.tags.length !== 0 && 
                    <div className="post100__tags">
                    <h4 className="tag" style={{paddingLeft: 0}}>tags:</h4>
                        {post.tags.map((tag, i) => {
                            return (
                            <h4 className="tag inlineTag" key={i} 
                                onMouseEnter={() => setHover(tag._id)}
                                onMouseLeave={() => setHover(null)}
                                style={(hover && hover === tag._id) ? {backgroundColor: tag.color, color:'#31302C', cursor:'pointer'} : {}}>
                                {tag.tag}
                            </h4>
                            )
                        })}
                    </div>
                    }
        </div>
        </>
         
    )
}