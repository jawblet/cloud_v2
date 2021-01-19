import React from 'react';

const Post100Tag = ({ tag, handleHover, handleStopHover, tagpath, ...props }) => {
    return (
        <div className="post100__tag">
        <h4 className="tag" 
            data-index={props.post._id}                                
            data-id={tag._id}
            onMouseEnter={handleHover} 
            onMouseLeave={handleStopHover}
            style={(tagpath && tagpath === tag._id ) 
                ? 
                    {backgroundColor: tag.color, 
                    color:'#31302C', 
                    cursor:'pointer'} : {}}
            >
            {tag.tag}
        </h4>
    </div>
    );
}
 
export default Post100Tag;