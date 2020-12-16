import React, { useRef } from 'react';
import TagPreview from '../../atoms/TagPreview';
import { CSSTransition } from 'react-transition-group';

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
                <div className="popup__tags">
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
                <div className="popup__tags">
                    {post.tags.map(tag => { return ( <TagPreview tag={tag} key={tag._id}/> ) })}
                </div>
            )}
    }
        
    return(
            <CSSTransition in={preview} timeout={350} nodeRef={nodeRef} classNames="fade" unmountOnExit>
                <div className="popup__wrapper" ref={nodeRef} key={post._id} >
                    <div className="popup">
                        <div className="popup__header">
                            <h4 className="lightest">{post.user.username}</h4> 
                        </div>
                        <div className="popup__body">
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