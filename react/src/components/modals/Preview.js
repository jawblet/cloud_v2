import React, { useRef } from 'react';
import TagPreview from '../../atoms/TagPreview';
import { CSSTransition } from 'react-transition-group';

export default function Preview({ preview, post, tags }) {
    const nodeRef = useRef(null); 
    const max = 2; 
    const tagNum = Object.keys(tags).length;

    const getTags = () => {
        if(post.tags.length === 0) {
            return(<p>without labels.</p>);
        };
        if(tagNum > max) {
            const remainder = (tagNum - max);
            return(
                <div className="popup__tags">
                    {Object.entries(tags).map(([key, value], i) => 
                        { if(i < max) {
                            return ( <TagPreview tag={key} count={value.length} color={value[0].color} key={key}/> )
                        } 
                        if(i === max) { //if i === map, show how many more paths 
                            return (<p>and {remainder} more.</p>)
                        } 
                        return null; //otherwise return 
                    })}
                </div>
            )
        } 
    };
        
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
