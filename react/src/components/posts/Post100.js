import React, { useRef, useEffect } from 'react';
import { Editor } from 'draft-js'; 
import { LinkPreview } from './LinkPreview';
import BasicSelectMenu from '../menus/BasicSelectMenu'; 
//import TagLegendPath from '../../atoms/TagLegendPath';
import useEditPost from '../../hooks/posts/useEditPost'; 
import { VscEllipsis } from 'react-icons/vsc';
import { getUniqueTags } from '../../pages/layer/layer_data';
import Post100Tag from './Post100Tag';
import TagLegendPath from '../../atoms/TagLegendPath';
 
export default function Post100(props) { 
    const { post, 
        toggleMenu, 
        menu, 
        i, 
        toggleRef, 
        revertAll, 
        handleDeletePost, 
        openPost, 
        tagpath 
            } = props;

    const postId = props.coords.postId;
    const editRef = useRef(null); 

    const uniqueTags = getUniqueTags(post.tags); 

    const { displayNoteBody, 
            editorState,  
            setEditorState, 
            onNoteChange } = useEditPost();

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
                    <VscEllipsis className="icon icon__btn post100__editBtn" 
                                            data-id={i} onClick={toggleMenu}/>
                     <div className="post100__header__editMenu">
                        <BasicSelectMenu items={['open', 'delete']} 
                            toggleMenu={toggleMenu}
                            show={menu[i]}
                            selectItem ={selectItem} 
                            childData={post._id}
                            revertAll={revertAll}
                            roundTop={true}
                            ref={toggleRef}
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
                        <h4 className="tag" style={{paddingLeft: 0}}>
                            paths:
                        </h4>
                        {uniqueTags.map((tag, i) => {
                            return (
                                <>
                                <Post100Tag tag={tag} key={i}
                                    {...props} />
                                
                                </>
                            )
                        })}
                    </div>
                }
               
        </div>
        </>   
    )
}

/*
<TagLegendPath coords={props.coords} 
                                    tag={tag} 
                                    enter={(tagpath && 
                                            tagpath === tag._id && 
                                            postId === post._id)}
                                            />
*/