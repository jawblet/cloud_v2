import React from 'react';

const Chevron = ({ expand, setExpand }) => {
    return (
        <div className={`dndHeader__chevron ${expand && "dndHeader__chevron--open"}`}
             onClick={() => setExpand(!expand)}>
            ◢
        </div>
    );
}
 
export default Chevron;