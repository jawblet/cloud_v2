import React from 'react';
import Tag from '../components/Tag';
 
export default function TagList({ tags, tagTotal, activeFilter, eyedrop }) {
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
            {activeFilter.includes('count') && 
                <h4>{tagTotal} tags </h4> }
        </>
    )
}