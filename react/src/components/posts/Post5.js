import React from 'react';

export default function Post5({ post }) {
    return (
        <> 
        {post.tagObject 
            ? 
                <div className="cell" 
                    style={{backgroundColor:post.tagObject[0].color}}>
                </div>
            :
                <div className="cell">
                </div>
            }
        </>
    ) 
}