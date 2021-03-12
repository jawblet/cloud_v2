import React from 'react';
import { Link } from 'react-router-dom';
import TagBody from './TagBody';


//Linked tag
export default function Tag(props) { 
    const {tag } = props;

    return (
        <Link to={`/path/${tag.slug[0]}`}>
            <TagBody {...props}/>
        </Link> 
    )
}
