import { useEffect, useState } from 'react';

//need posts per row + all posts to calc rows 
export default function useGetRows({postsPerRow, allPosts}) { 
    const [postArrays, setPostArrays] = useState(null);
    const [loading, setLoading] = useState(true);
    
useEffect(() => {
    if(allPosts && allPosts.length > 0) { 
        
        async function splicePosts() { 
            const postTotal = allPosts.length; 
            const numRows = [...Array(Math.ceil(postTotal / postsPerRow))];
            const postArrays = numRows.map((row, i) => allPosts.slice(i * postsPerRow, i * postsPerRow + postsPerRow ));
            setPostArrays(postArrays);
            setLoading(false);
        }
        
        splicePosts();
    }
}, [allPosts]);

    return {
        loading,
        postArrays,
    }
}
