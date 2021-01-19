import React from 'react';
import PostList100 from '../../sections/posts/PostList100';
import PostList25 from '../../sections/posts/PostList25';

const SwitchViews = (props) => {


    return (
        <>
        <PostList100 {...props}
            />
        <PostList25 {...props}
            />
        </>
    );
}
 
export default SwitchViews;