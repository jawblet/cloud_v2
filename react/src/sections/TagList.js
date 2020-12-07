import React, { useRef } from 'react';
import Tag from '../components/Tag';
import { CSSTransition } from 'react-transition-group';
 
export default function TagList({ tags, tagCount, activeFilter, eyedrop }) {
    const nodeRef = useRef(null); 

    return(
        <>
        <div className="houseTags">
        {(!tags) 
            ? <div>No tags yet</div>
            : tags.map((tag, i) => {
                return(
                    <div key={i}>
                       <Tag tag={tag} activeFilter={activeFilter} eyedrop={eyedrop}/>
                  </div>
                )
            })}
        </div> 
             <CSSTransition 
             in={activeFilter.includes('count')} timeout={350} 
             nodeRef={nodeRef} classNames="fade"
             unmountOnExit>
            <div className="houseTags__stats" ref={nodeRef}>
                <h4>This house has created {tagCount.unique} tags&nbsp; </h4>
                <h4> and used them {tagCount.sum} total times. </h4>
            </div>
            </CSSTransition> 
        </>
    )
}