import React from 'react';

const EmptyPage = ({ kind }) => {
    return (
        <div className="layer__empty">
            <h3 className="light">Empty {kind}</h3>
        </div>
    );
}
 
export default EmptyPage;