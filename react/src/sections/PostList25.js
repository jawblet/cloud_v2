import React, { useRef } from 'react';   
import Post from '../components/posts/Post';
import { CSSTransition } from 'react-transition-group';

export default function PostList25(props) { 
    const { activeView } = props; 
    const nodeRef = useRef(null); 
    const postMax = 4; 
    const postTotal = props.posts.length;
    const numRows = [...Array(Math.ceil(postTotal / postMax))]; // # of rows on pg
    const postArrs = numRows.map((row, i) => props.posts.slice(i * postMax, i * postMax + postMax ));
        
    return(
        <CSSTransition 
            in={activeView === '25%'} 
            timeout={250} 
            nodeRef={nodeRef} classNames="zoom"
            unmountOnExit
            exit={false}>
                <div className="postRow25__container" ref={nodeRef}>
                    {postArrs.map((row, i) => {
                        return(
                            <div className="postRow25" key={i}>
                            {row.map((post, i) => <Post post={post} key={i} openPost={props.openPost}/> )}
                        </div>
                        )
                    })}
                </div>
            </CSSTransition>
        )      
}

