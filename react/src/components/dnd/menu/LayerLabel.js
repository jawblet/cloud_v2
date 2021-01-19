import React from 'react';

const LayerLabel = ({group}) => {
    return (  
        <div className="dndHeader__label dndHeader__label--ungrouped">
            <h4>
                {group.label}
            </h4>
        </div>
    );
}
 
export default LayerLabel;