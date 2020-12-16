import React from 'react';

export default function Post5({ post }) {
    console.log(post);
    return (
        <> 
        {post.tagObject 
            ? 
                <div className="post5" style={{backgroundColor:post.tagObject[0].color}}>
                </div>
            :
                <div className="post5">
                </div>
            }
        </>
    )
}