import React from 'react';
import ColorPicker from '../atoms/ColorPicker';
import TagCount from '../atoms/TagCount';

const TagBody = (props) => {
    const {tag, activeFilter } = props;

    return (
        <div className="tag"
                style={activeFilter.includes('color') 
                        ? {backgroundColor: tag.tagObject[0].color} : 
                            {}} >
                <h4>{tag.name}</h4>
            <ColorPicker {...props}/>
            <TagCount {...props}/>
    </div>
    );
}
 
export default TagBody;