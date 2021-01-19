import React from 'react';

const EmptyZone = ({ group }) => {
    return (
        <figure className="assignColor__group">
            <div className="key__color key__color--empty" 
                >
            </div>
            <figcaption className="assignColor__caption">
                {group.label}
            </figcaption>
        </figure>
    );
}
 
export default EmptyZone;