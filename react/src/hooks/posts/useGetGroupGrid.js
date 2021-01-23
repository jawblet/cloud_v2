import { useEffect, useState } from 'react';

export default function useGetGroupGrid() {
    const [postArrays, setPostArrays] = useState(null);
    const [loading, setLoading] = useState(true);

    async function splicePosts(postsPerRow, allPosts) { 
        const postTotal = allPosts.length; 
        const numRows = [...Array(Math.ceil(postTotal / postsPerRow))];
        const postArrays = numRows.map((row, i) => allPosts.slice(i * postsPerRow, i * postsPerRow + postsPerRow ));
        setPostArrays(postArrays);
        setLoading(false);
        } 
            
    return {
        postArrays,
        loading,
        splicePosts
    }
}