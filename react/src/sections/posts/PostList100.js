import React, { useRef } from 'react';
import Post100 from '../../components/posts/Post100';
import useToggleOneOfMany from '../../hooks/useToggleOneOfMany';
import { CSSTransition } from 'react-transition-group';
 
export default function PostList100(props) {   
    const { activeView, posts } = props;   
    const nodeRef = useRef(null);

    //open post menus 
    const { toggleMenu, 
        toggleRef, 
        menu, 
        revertAll } = useToggleOneOfMany(posts); 
  
    return(
        <CSSTransition
        in={activeView === '100%'} 
        timeout={250} nodeRef={nodeRef} classNames="zoomIn" unmountOnExit
        exit={false}>
            <div className="postRow100" ref={nodeRef}> 
            {props.posts.map((post, i )=> {
                    return ( <Post100 post={post} key={post._id} 
                                    toggleMenu={toggleMenu}
                                    menu={menu} 
                                    i={i}
                                    revertAll={revertAll}
                                    toggleRef={toggleRef}
                                    {...props}
                    /> ) 
                })}
            </div>  
        </CSSTransition>
    )
}