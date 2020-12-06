import React from 'react'; 
import Post from '../components/Post';

export default function PostList25(props) { 
    return(
        <div className="postList"> 
        {props.posts.length > 0 
           ? props.posts.map((post, index )=> {
                return ( <Post post={post} key={index} 
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

