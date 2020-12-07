import React from 'react';   
import Post from '../components/posts/Post';

export default function PostList25(props) { 
    const postMax = 4; 
    const postTotal = props.posts.length;

    if (postTotal !== 0) {
        const numRows = [...Array(Math.ceil(postTotal / postMax))]; // # of rows on pg
        let postArrs = numRows.map((row, i) => props.posts.slice(i * postMax, i * postMax + postMax ));
        return(
            <> 
             {postArrs.map((row, i) => {
                return(
                    <div className="postRow25" key={i}>
                    {row.map((post, i) => <Post post={post} key={i} openPost={props.openPost}/> )}
                </div>
                )
            })}
            </>
        )
    } 

        return(
            <div className="emptyRoom">
                <h3 className="light">Empty room</h3>
            </div>
        )        
}

