import React from 'react';
import { Link } from 'react-router-dom';
import InboxPreviw from './InboxPreview';

const InboxLink = (props) => {
    const { post } = props;
 
    return ( 
        <Link to={{pathname: `/house/${post._id}`, state: post}}>
            <InboxPreviw {...props}/> 
        </Link> 
    );
}
 
export default InboxLink;

/*
   const history = useHistory();

    const push = (id) => {
        history.push(`/house${id}`);
    }
*/