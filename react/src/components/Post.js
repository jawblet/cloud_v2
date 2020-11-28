import React, { useState } from 'react';
import Preview from './Preview';
  
export default function Post({ post, view }) { 
    console.log(view);
   

    const getPostGradient = (tagObj) => {
        let colorArr = tagObj.map(el => el.color);
        let colorString = colorArr.toString();
        return (
            <div className="postGradient" style={{background:`conic-gradient(${colorString})`}}>
            </div>
        )
    }


    const getPostColorBlock = (tagObj) => {
        let body;
        let colors = tagObj.map(el => el.color);
        
        const TwoTags = (colors) => {
            return(
                <div className="postBody">
                    <span className="postHalf--1" style={{backgroundColor:colors[0]}}> </span>
                    <span className="postHalf--2" style={{backgroundColor:colors[1]}}> </span>
                </div>
            )
        }

        switch(tagObj.length) {
            case 1: body = "1";
            break;
            case 2: body = TwoTags(colors);
            break;
            case 3: body = "3";
            break;
            default: body = "nobody";
        }
        return body; 
    }

    const [preview, showPreview] = useState(false);

    return(
        <div className="post" key={post._id} onMouseEnter={() => showPreview(true)} onMouseLeave={() => showPreview(false)}>
            <div className="post__header">
                <h4 className="lightest">{post.user.username}</h4>  <h4 className="lightest">{post.date}</h4>
            </div>
            <div className="post__body">
                {view === 'gradient' && getPostGradient(post.tags)}
                {/*getPostColorBlock(post.tags)*/}
            </div>
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