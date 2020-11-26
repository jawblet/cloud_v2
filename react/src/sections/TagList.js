import React from 'react';
import Tag from '../components/Tag';
 
export default function TagList({ tags, tagTotal, activeFilter }) {
    return(
        <>
        <div className="houseTags">
        {(!tags) 
            ? <div>No tags yet</div>
            : tags.map((tag, i) => {
                return(
                    <div key={i}>
                       <Tag tag={tag} activeFilter={activeFilter}/>
                  </div>
                )
            })}
        </div>
            {activeFilter.includes('count') && 
                <h4>Count: {tagTotal} tags </h4> }
        </>
    )
}