import React from 'react';
import TagPreview from '../atoms/TagPreview';

export default function EditSidebar(props) {
    const { post, tags } = props;

    return(
        <>
        <div className="edit__metadata">
                    <h4 className="lightest">created by</h4>
                    <h4 className="light">
                        {post.user.username}
                    </h4>
                </div>
                <div className="edit__metadata">
                    <h4 className="lightest">created on</h4>
                    <h4 className="light">
                        {post.date}
                    </h4>
                </div>
                <div className="edit__metadata">
                    {post.tags.length > 0 
                        ? <>
                        <h4 className="lightest">tags</h4>
                            { Object.entries(tags).map(([key, value]) => { 
                            return ( 
                                    <TagPreview tag={key} count={value.length} color={value[0].color} key={key}/> 
                                    ) 
                                })}
                            </>
                    : <h4 className="lightest">no tags</h4>
                    } 
        </div>
        </>
    )
}