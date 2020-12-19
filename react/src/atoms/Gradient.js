import React, { useState, useEffect } from 'react';
import Preview from './../components/modals/Preview';
 
export default function Gradient({ post, tags }) {
    const [preview, showPreview] = useState(false);
    const [angle, setAngle] = useState(0);
    const [colors, setColors] = useState('');

    //generate angle and gradients for post 
    useEffect(() => {
        setAngle(Math.floor(Math.random() * Math.floor(360))); 
        let colorArr = post.tags.map(tag => tag.color);
            if(colorArr.length === 1) { //fix gradient if only one color selected
                colorArr = ['snow 30deg', `${colorArr[0]} 90deg`, 'snow 300deg']; 
            }
        const colorString = colorArr.toString();
        setColors(colorString);
    }, [post])
  
    return (
        <>
                <Preview preview={preview} post={post} tags={tags}/>
            <div className="gradient__post">
                <div className="gradient"                 
                        style={{background:`conic-gradient(${colors})`,
                        transform:`rotate(${angle}deg)`
                        }}>
                </div>
                <span className="gradient__pin" onMouseEnter={() => showPreview(true)}
                                                onMouseLeave={() => showPreview(false)} >
                </span>
            </div>
        </>  
 )
}