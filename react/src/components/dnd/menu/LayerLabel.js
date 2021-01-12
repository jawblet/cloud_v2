import React from 'react';

const LayerLabel = ({row}) => {
    return (  
        <div className="dndHeader__label dndHeader__label--ungrouped">
            <h4>
                {row.label}
            </h4>
        </div>
    );
}
 
export default LayerLabel;