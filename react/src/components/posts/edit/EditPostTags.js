import React from 'react';
import TagPreview from '../../../atoms/TagPreview';

const EditPostTags = ({ tags }) => {

    if(Object.keys(tags).length !== 0){
        return ( 
            <>
        <h4 className="lightest">tags</h4>
            {Object.entries(tags).map(([key, value]) => { 
            return ( 
                <TagPreview 
                        tag={key} 
                        count={value.length} 
                        color={value[0].color} 
                        key={key}/> 
                    ) 
                })}
            </>
        )} else {
            return <h4 className="lightest">no tags</h4>
        }


}
 
export default EditPostTags;