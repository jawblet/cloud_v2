import React from 'react';
import { Link } from 'react-router-dom';
import InboxPreviw from './InboxPreview';

const InboxLink = (props) => {
    const { post } = props;

    // state should be what pg the link is on 
    return ( 
        <Link to={{pathname: `/house/${post._id}`, state: post}}>
            <InboxPreviw {...props}/>
        </Link> 
    );
}
 
export default InboxLink;
