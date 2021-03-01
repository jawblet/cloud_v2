import { useState } from 'react';

export default function useGetGroupGrid() {
    //fill row to end 
    const [postArrays, setPostArrays] = useState(null);
    const [loading, setLoading] = useState(true);

    async function splicePosts(postsPerRow, allPosts) { 
        const postTotal = allPosts.length; 
        const emptyArr = [...Array(postsPerRow)];
        emptyArr.fill('empty', 0, postsPerRow); // empty row w/ blanks 

        const numRows = [...Array(Math.ceil(postTotal / postsPerRow))]; // # of rows from group 
        let postArrays = numRows.map((row, i) => allPosts.slice(i * postsPerRow, i * postsPerRow + postsPerRow ));
        
        let newPostArrays;
        newPostArrays = postArrays.map(el => {
            if(el.length < postsPerRow) { //fill last row to 20
                const emptyArr = [...Array(postsPerRow - el.length)];
                emptyArr.fill({id: 'empty'}, 0, emptyArr.length);
                return [...el, ...emptyArr];
            }   
            return el;
        }); 
        setPostArrays(newPostArrays);
        setLoading(false);
        } 
             
    return {
        postArrays,
        loading,
        splicePosts
    }
}