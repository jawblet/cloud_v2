import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/Loading';
import { EmptyPage, EmptySubpage } from './EmptyPage';
import SwitchViews from './SwitchViews';
import PathLegend from '../../components/modals/PathLegend';
import useLayerPosts from '../../hooks/layers/useLayerPosts';
import useManagePosts from '../../hooks/posts/useManagePosts';
import useTagLegend from '../../hooks/paths/useTagLegend';

const PageBody = (props) => {  
    const params = useParams(); 
    
    const { 
        posts, 
        loading, 
        getLayerPosts,
        getPathPosts 
         } = useLayerPosts(); 
    
    const { tagpath, 
            coords, 
            handleHover,
            handleStopHover,
            tagRef, 
            tagDetails, 
            postExcerpts, 
            loadModal } = useTagLegend();

   const { openPost, deletePost } = useManagePosts();

    useEffect(() => {  //get room and posts 
        if(props.path) {
         return getPathPosts(props.path._id);
        }
 
       return getLayerPosts(props.layer.id);
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
        <>
            <SwitchViews 
                handleDeletePost={handleDeletePost} 
                openPost={openPost} 
                posts={posts}
                handleHover={handleHover} 
                handleStopHover={handleStopHover}
                coords={coords} tagpath={tagpath}
                {...props} 
                />
            
                <PathLegend ref={tagRef}
                tagpath={tagpath} 
                tagDetails={tagDetails} 
                loadModal={loadModal} 
                postExcerpts={postExcerpts}
                />
        </>
        )
}
 
export default PageBody;






//can we do a switch transition here? 