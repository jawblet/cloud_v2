import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/Loading';
import { EmptyPage, EmptySubpage } from './EmptyPage';
import useLayerPosts from '../../hooks/layers/useLayerPosts';
import useManagePosts from '../../hooks/posts/useManagePosts';
import SwitchViews from './SwitchViews';

const PageBody = (props) => { 
    const params = useParams();

    const {  
        posts, 
        loading, 
        getLayerPosts
         } = useLayerPosts(props.layer.id);

   const { openPost, deletePost } = useManagePosts();

    useEffect(() => {  //get room and posts 
        getLayerPosts();
    }, [params]);

    async function handleDeletePost(e) {
       await deletePost(e.target.dataset.id);
       await getLayerPosts();
    }

    if(loading) {
        return <Loading/>
    }
    
    if(!posts.length) { 
        return( <> 
            {props.subpage 
                ? <EmptySubpage type="layer"/>
                : <EmptyPage type="layer"/>
            } 
        </> )
    }

    return(
            <SwitchViews 
                handleDeletePost={handleDeletePost} 
                openPost={openPost} 
                posts={posts}
                {...props}
                />
        )
}
 
export default PageBody;






//can we do a switch transition here? 