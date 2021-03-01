import React from 'react';
import { Link } from 'react-router-dom';
import ColorPicker from '../atoms/ColorPicker';
import TagCount from '../atoms/TagCount';


export default function Tag(props) {
    const {tag, activeFilter } = props;
   console.log(tag);

    return (
        <Link to={`/path/${tag.slug[0]}`}>
            <div className="tag"
                style={activeFilter.includes('color') 
                        ? {backgroundColor: tag.tagObject[0].color} : 
                            {}} >
                <h4>{tag.name}</h4>
            <ColorPicker {...props}/>
            <TagCount {...props}/>
            </div>
        </Link> 
    )
}


