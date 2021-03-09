import React from 'react';
import TagPreview from '../../atoms/TagPreview'; 
import Fade from '../animate/Fade';

export default function Preview({ preview, post, tags }) {
    const max = 2; 
    const tagNum = Object.keys(tags).length; 

        const getTags = () => {
            if(!post.tags) {
                return null;
            }

            if(post.tags.length === 0) {
                return(<p> without labels.</p>);
            };

            const remainder = (tagNum - max);
            return (
                <div className="popup__tags">
                    {Object.entries(tags).map(([key, value], i) => 
                        { if(i < max) {
                            return ( <TagPreview tag={key} count={value.length} color={value[0].color} key={key}/> )
                        } 
                        if(i === max) { //if i === map, show how many more paths 
                            return (<p key={key}>and {remainder} more.</p>)
                        } 
                        return null; //otherwise return 
                    })}
                </div>
            )
        }; 
        
    return(
            <Fade in={preview} exit={false} short>
                <div className="popup__wrapper" key={post._id}>
                    <div className="popup postPreview">
                        <div className="popup__header"> 
                            <h4 className="lightest">{post.user.username}</h4> 
                        </div>
                        <div className="popup__body">
                        <p style={{display:'inline'}}> 
                            <span style={{textTransform:'capitalize'}}>
                                {post.type}&nbsp;
                            </span> 
                                posted on {post.date}</p>{getTags(post.tags.length)} 
                        </div>
                    </div>
                </div>
            </Fade>
    )
} 
