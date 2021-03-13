import React, { useEffect } from 'react';
import useLayerPosts from '../../hooks/layers/useLayerPosts';
import PathCellContent from './PathCellContent';

const PathCell = ({ path, squeeze }) => {

    const { 
        posts, 
        getPathPosts,
        loading
         } = useLayerPosts(); 

    useEffect(() => {
        async function onPageLoad() { 
            await getPathPosts(path._id);
        };
            onPageLoad();
    }, []);
 
    if(loading) {
        return null;
    }

    return ( 
        <div className="pathCell">
            <PathCellContent posts={posts} 
                        color={path.color}
                        squeeze={squeeze}
                        />
        </div>
       
    );
}
 
export default PathCell;
