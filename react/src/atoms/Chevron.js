import React from 'react';

const Chevron = ({ expand, setExpand }) => {
    return (
        <div className={`chevron ${expand && "chevron--open"}`}
             onClick={() => setExpand(!expand)}>
            ◢
        </div> 
    );
}
 
export default Chevron;