import React, { useEffect } from 'react';
import useLayerPosts from '../../hooks/layers/useLayerPosts';
import PathCellContent from './PathCellContent';

const PathCell = ({ id }) => { 

    const { 
        posts, 
        getPathPosts,
        loading
         } = useLayerPosts(); 

    useEffect(() => {
        async function onPageLoad() {
            await getPathPosts(id); 
        };
            onPageLoad();
    }, []);
 
    if(loading) {
        return null;
    }

    return (
        <PathCellContent posts={posts}/>
    );
}
 
export default PathCell;

/*

    <div className="pathCell--posts">
        {posts && posts.map(post => {
                return(< Pin key={post._id} />)
            })}
    </div>
*/
