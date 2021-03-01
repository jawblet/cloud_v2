import React, { useEffect, useRef, useContext } from 'react';
import Post5 from '../../components/posts/Post5';
import useTags from '../../hooks/paths/useTags';
import { Loading } from '../../components/Loading';
import { UserContext } from '../../hooks/UserContext';
 
export default function PostList5() { 
const { user } = useContext(UserContext);
const house = user.house.house;
const nodeRef = useRef(null);

const { t_loading, allTags, getAllTagsFromPosts } = useTags();

useEffect(() => {
    getAllTagsFromPosts();
}, []);

if(t_loading) {
    return <Loading/>
}

const postMax = 20;
const rowMin = 5;
const postTotal = allTags.length;
const emptyArr = [...Array(postMax)];
emptyArr.fill('empty', 0, 20);
const numRows = [...Array(Math.ceil(postTotal / postMax))]; // # of rows on pg
let postArrs = numRows.map((row, i) => allTags.slice(i * postMax, i * postMax + postMax ));
let newPostArrs;

newPostArrs = postArrs.map(el => {
    if(el.length < postMax) { //fill last row to 20
        const emptyArr = [...Array(postMax - el.length)];
        emptyArr.fill('empty', 0, emptyArr.length);
        return [...el, ...emptyArr];
    }   
    return el;
}); 


if(allTags.length === 0 ) {
    return null
}

if(newPostArrs.length < rowMin) {
    for(let i = postArrs.length; i < rowMin; i++) { //at least 5 rows
    newPostArrs.push(emptyArr);
    }
}
    return(
        <div className="tagKey">
            <h3 className="houseTitle">{house} tags</h3>
            <div className="postRow5__container" ref={nodeRef}>
                    {newPostArrs.map((row, i) => {
                        return(
                        <div className="postRow5" key={i}>
                            {row.map((post, i) => <Post5 post={post} key={i}/> )}
                        </div>
                            )
                        })
                    }
                </div> 
        </div>
    )
}
    






