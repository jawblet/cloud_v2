import React from 'react';
import Post from '../components/Post';

export default function PostList(props) {
    // console.log(props);
    return(
        <div className="roomPosts">
            {props.posts.map((post, index )=> {
                return ( <Post post={post} key={index}/> )
            })}
        </div>
    )
}