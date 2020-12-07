import React from 'react';
import Post100 from '../components/posts/Post100';
 
export default function PostList100(props) { 
    return(
        <div className="postList100"> 
        {props.posts.length > 0 
           ? props.posts.map((post, index )=> {
                return ( <Post100 post={post} key={index} 
                                openPost={props.openPost}
                /> )
            })
            :   <div className="emptyRoom">
                    <h3 className="light">Empty room</h3>
                </div>
            }
        </div>
    )
}