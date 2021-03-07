import React, { useEffect } from 'react';
import useLayerPosts from '../../hooks/layers/useLayerPosts';
import Pin from '../../atoms/Pin';

const PostCell = ({ id }) => { 
    const { 
        posts, 
        loading, 
        getLayerPosts,
         } = useLayerPosts();

    useEffect(() => {
        async function onPageLoad() {
            await getLayerPosts(id);
        };
            onPageLoad();
        }, []);
 
    if(loading) {
        return null;
    };

    return (
        <div className="postCell">
           {posts && posts.map(post => {
               return(< Pin key={post._id} />)
           })}
        </div>
    );
}
 
export default PostCell;