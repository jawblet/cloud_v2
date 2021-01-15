import React from 'react';

export const EmptyPage = ({ type }) => {
    return (
        <div className='layer__empty'>
            <h3 className="light">
                Empty {type}
            </h3>
        </div>
    );
}
 
export const EmptySubpage = ({ type }) => {
    return (
        <div className='layer__empty--sub'> 
            <h4 className="lightest">
                Empty {type}
            </h4>
        </div>
    );
}