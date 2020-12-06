import React from 'react';
import Post5 from '../components/Post5';

export default function PostList5(props) {
    return (
        <div>
            {props.posts.length > 0 
           ? props.posts.map((post, index )=> {
                return ( <Post5 post={post} key={index} 
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