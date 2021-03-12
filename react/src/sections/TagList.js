import React from 'react';
import TagBody from '../components/TagBody';
import Fade from '../components/animate/Fade';

export default function TagList({ tags, tagCount, ...props }) {

    return( 
        <>
        <div className="houseTags">
            {tags.map((tag, i) => {
                return(
                    <div style={{marginBottom:'1rem'}} key={i}>
                        <TagBody tag={tag} {...props}
                        />
                    </div>
                )
            })}
        </div> 
             <Fade in={props.activeFilter.includes('count')}>
            <div className="houseTags__stats">
                <h4>This house has created {tagCount.unique} tags&nbsp; </h4>
                <h4> and used them {tagCount.sum} total times. </h4>
            </div>
            </Fade> 
        </>
    )
}
