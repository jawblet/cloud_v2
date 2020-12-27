import React, { useState, useEffect } from 'react';
import chunk from 'lodash/chunk';


export default function useGetGrids({ skipInterval, allPosts }) {
    const [gridArrays, setGridArrays] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    if(allPosts && allPosts.length !== 0) {
        let postArr = {
            0: [],
            1: [],
            2: [],
            3: [],
        };
        
        function dividePosts() {
            const chunks = chunk(allPosts, skipInterval);
            
            chunks.forEach(chunk => {
                    chunk.forEach((el, i) => {
                        let newEntry = el;
                        postArr[i].push(newEntry); 
                    })
                })

            //console.log(postArr);
            setGridArrays(postArr);
            setLoading(false);
            }

            dividePosts();
        }
    }, [allPosts])

    return {
        loading,
        gridArrays
    }
}

//array.push(el);
/*
    const postArr = [
                {NE: []},
                {SE: []},
                {SW: []},
                {NW: []}
            ];
*/