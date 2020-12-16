import React, { useRef, useEffect } from 'react';
import { Editor } from 'draft-js'; 
import { LinkPreview } from './LinkPreview';
import usePosts from '../../hooks/usePosts'; 
import { VscEllipsis } from 'react-icons/vsc';
import BasicSelectMenu from '../menus/BasicSelectMenu'; 
import TagLegendPath from '../../atoms/TagLegendPath';
 
export default function Post100({ post, toggleMenu, menu, index, revertAll, 
                                setHover, hover, handleHover, coords }) { 
    const postId = coords.index;
    
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
                    <h4 className="tag" style={{paddingLeft: 0}}>paths:</h4>
                        {post.tags.map((tag, i) => {
                            return (
                            <div className="inlineTag__wrapper" key={i}>
                                <h4 className="tag inlineTag" 
                                    data-index={post._id}                                
                                    data-id={tag._id}
                                    onMouseEnter={handleHover}
                                    onMouseLeave={() => setHover(null)}
                                    onMouseOut={() => setHover(null)}
                                    style={(hover && hover === tag._id ) ? {backgroundColor: tag.color, color:'#31302C', cursor:'pointer'} : {}}>
                                    {tag.tag}
                                </h4>
                                <TagLegendPath coords={coords} 
                                                tag={tag} 
                                                enter={(hover && hover === tag._id && postId === post._id) ? true : false}/>
                            </div>
                            )
                        })}
                    </div>
                    }
        </div>
        </>
         
    )
}

