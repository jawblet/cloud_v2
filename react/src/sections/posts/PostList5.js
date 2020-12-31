import React, { useRef } from 'react';
import Post5 from '../../components/posts/Post5';
import { CSSTransition } from 'react-transition-group';

export default function PostList5(props) {
const nodeRef = useRef(null);
const { activeView } = props; 

const tags = props.tags;

const postMax = 20;
const rowMin = 5;
const postTotal = tags.length;
const emptyArr = [...Array(postMax)];
emptyArr.fill('empty', 0, 20);
const numRows = [...Array(Math.ceil(postTotal / postMax))]; // # of rows on pg
let postArrs = numRows.map((row, i) => tags.slice(i * postMax, i * postMax + postMax ));
let newPostArrs;

newPostArrs = postArrs.map(el => {
    if(el.length < 20) { //fill last row to 20  
        const emptyArr = [...Array(postMax - el.length)];
        emptyArr.fill('empty', 0, emptyArr.length);
        return [...el, ...emptyArr];
    }   
    return el;
});


if(tags.length === 0 ) {
    return null
}

if(newPostArrs.length < rowMin) {
    for(let i = postArrs.length; i < rowMin; i++) { //at least 5 rows
    newPostArrs.push(emptyArr);
    }
}
    return(
        <CSSTransition 
        in={activeView === '5%'} 
        timeout={250} 
        nodeRef={nodeRef} classNames="zoomOut"
        unmountOnExit
        exit={false}>
            <div className="postRow5__container" ref={nodeRef}>
                {newPostArrs.map((row, i) => {
                    return(
                        <div className="postRow5" key={i}>
                        {row.map((post, i) => <Post5 post={post} key={i}/> )}
                    </div>
                    )
                })}
            </div> 
        </CSSTransition>
    )
}
    






