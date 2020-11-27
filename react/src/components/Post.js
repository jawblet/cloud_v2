import React, { useState } from 'react';
import Preview from './Preview';
 
export default function Post(props) { 
    const getPostType = () => {
        let icon;
        switch(props.post.type) {
            case "link": icon = "📎";
            break;
            default: icon="?";
        }
        return icon;
    }

    const [preview, showPreview] = useState(false);

    return(
        <div className="post" onMouseEnter={() => showPreview(true)} onMouseLeave={() => showPreview(false)}>
            <div className="post__row">
                <h4 className="lightest">{props.post.username}</h4>  <h4 className="lightest">{props.post.date}</h4>
            </div>
            <div className="post__body">
                {getPostType()}
            </div>
            <div className="post__tags">
                {props.post.tags.map(tag => {
                    return(<h4>{tag}</h4>)
                })}
            </div>
        </div>
    )
}