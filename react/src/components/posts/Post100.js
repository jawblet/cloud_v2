import React, { useRef, useEffect } from 'react';
import { Editor } from 'draft-js'; 
import { LinkPreview } from './LinkPreview';
import usePosts from '../../hooks/usePosts'; 
import { VscEllipsis } from 'react-icons/vsc';
import BasicSelectMenu from '../menus/BasicSelectMenu'; 
import TagLegendPath from '../../atoms/TagLegendPath';
 
export default function Post100(props) { 
    const { post, toggleMenu, menu, index, revertAll, handleDeletePost, openPost, handleStopHover, tagpath, handleHover, coords } = props;
    const editRef = useRef(null); 
    const postId = coords.postId;
    const uniqueTags = Array.from(new Set(post.tags.map(el => el.tag)))
                            .map(tag => { const uniqueTag = post.tags.find(el => el.tag === tag);
                                return uniqueTag;
                            });

    const { displayNoteBody, 
            editorState, 
            setEditorState, 
            onNoteChange } = usePosts();

    useEffect(() => {
        if(post.type === 'note') { 
            displayNoteBody(post);
        } 
        return null
    }, [post])

    const selectItem = (e) => {
        const action = e.currentTarget.dataset.label;
        switch(action) {
            case "delete": handleDeletePost(e);
            break;
            case "open": openPost(e);
            break;
            default: return null;
        }
    }

    return ( 
        <> 
        <div className="post100">
            <div className="post100__header">
                <h4 className="lightest">{post.user.username}</h4>  
                <div className="post100__header__edit">
                    <h4 className="lightest">{post.date}</h4>
                    <VscEllipsis className="icon icon__btn post100__editBtn" data-id={index} onClick={toggleMenu}/>
                     <div className="post100__header__editMenu">
                        <BasicSelectMenu items={['open', 'delete']} 
                            toggleMenu={toggleMenu}
                            show={menu[index]}
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
                        {uniqueTags.map((tag, i) => {
                            return (
                            <div className="post100__tag" key={i}>
                                <h4 className="tag" 
                                    data-index={post._id}                                
                                    data-id={tag._id}
                                    onMouseEnter={handleHover} 
                                    onMouseLeave={handleStopHover}
                                    style={(tagpath && tagpath === tag._id ) ? {backgroundColor: tag.color, color:'#31302C', cursor:'pointer'} : {}}
                                    >
                                    {tag.tag}
                                </h4>
                                <TagLegendPath coords={coords} 
                                                tag={tag} 
                                                enter={(tagpath && tagpath === tag._id && postId === post._id) 
                                                        ? true 
                                                        : false}/>
                            </div>
                            )
                        })}
                    </div>
                }
        </div>
        </>   
    )
}

