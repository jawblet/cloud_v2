import React, { useEffect } from 'react';
import useGroupPosts from '../../hooks/layers/useGroupPosts';
import Cell from './Cell';
import useGetGroupGrid from '../../hooks/posts/useGetGroupGrid';

const GroupGrid = ({ group }) => {
    //get all posts by group 
    const {  getGroupPosts, posts } = useGroupPosts();
    const { splicePosts, postArrays } = useGetGroupGrid();

    useEffect(() => {
        async function onPageLoad() {
            await getGroupPosts(group.layers, group.zone); //should return all posts + call splice w/ them
        }
        onPageLoad();
    }, []);

    useEffect(() => {
        if(posts) {
            splicePosts(20, posts);
        }
    }, [posts])

    console.log(postArrays);

    return (
        <div className="groupGrid">
            I'm... a grid
            <div className="postRow5">
                {postArrays && postArrays.map((post, i) => {
                    return <Cell key={i}/>
                })}
            </div>  
        </div>
    );
}
 
export default GroupGrid;