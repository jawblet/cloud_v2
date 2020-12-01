import React, { useState } from 'react';
import Preview from './Preview'
import { Route, Link, useLocation } from 'react-router-dom';
import usePosts from '../hooks/usePosts';
  
export default function Post({ post, view, editPost }) { 
    let location = useLocation();
    const [preview, showPreview] = useState(false);

    const { displayPostBody } = usePosts();

    return(
        <div className="post" key={post._id} data-id={post._id}
            onMouseEnter={() => showPreview(true)} onMouseLeave={() => showPreview(false)}>                      
            <div className="post__header">
                <h4 className="lightest">{post.user.username}</h4>  <h4 className="lightest">{post.date}</h4>
            </div>
            <Link to={{pathname: `${location.pathname}/${post._id}`,
                       state: {post: post }}}
                       className="post__body">
                <div onClick={editPost}>
                    {displayPostBody(post)}
                </div>
            </Link>
            <div className="post__tags">
                {(post.tags.length > 0) 
                ? post.tags.map(el => {
                    return (
                    <h4 key={el.tag}>
                        {el.tag}
                    </h4>
                    )
                })
                : <h4 className="lightest">No tags</h4> }
            </div>
        </div>
    )
}
