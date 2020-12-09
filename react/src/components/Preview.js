import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import TagPreview from '../atoms/TagPreview';

export default function Preview({ preview, post }) {
    const nodeRef = useRef(null);
    const max = 2; 

    const getTags = () => {
        if(post.tags.length === 0) {
            return(<p>without labels.</p>);
        }

        if(post.tags.length > max) {
            const remainder = (post.tags.length - max);
            return(
                <div className="postPreview__tags">
                    {post.tags.map((tag, i) => 
                        { if(i < max) {
                            return ( <TagPreview tag={tag} key={tag._id}/> ) 
                        } 
                            return null; // return from map
                    }) }
                    <p>and {remainder} more.</p>
                </div>
            )
        } else {
            return (
                <div className="postPreview__tags">
                    {post.tags.map(tag => { return ( <TagPreview tag={tag} key={tag._id}/> ) })}
                </div>
            )}
    }
        
    return(
            <CSSTransition in={preview} timeout={350} nodeRef={nodeRef} classNames="fade" unmountOnExit>
                <div className="postPreview" ref={nodeRef} key={post._id} >
                    <div className="postPreview__content">
                        <div className="postPreview__header">
                            <h4 className="lightest">{post.user.username}</h4> 
                        </div>
                        <div className="postPreview__body">
                        <p> 
                            <span style={{textTransform:'capitalize'}}>
                                {post.type}&nbsp;
                            </span> 
                         posted on {post.date} </p> 
                                {getTags(post.tags.length)} 
                        </div>
                    </div>
                </div>
            </CSSTransition>
    )
} 