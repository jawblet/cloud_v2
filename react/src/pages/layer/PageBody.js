import React from 'react';
import PostList100 from '../../sections/posts/PostList100';
import PostList25 from '../../sections/posts/PostList25';
import { Loading } from '../../components/Loading';
import EmptyPage from './EmptyPage';

const PageBody = (props) => {
    const { posts, 
        p_loading } = props;

    if(p_loading) {
        return <Loading/>
    }
    
    if(!posts.length) {
        return <EmptyPage kind="layer"/>
    }

    return(
            <>
            <PostList100 {...props} />
            <PostList25 {...props}/>
            </>
        )
}
 
export default PageBody;

//can we do a switch transition here? 