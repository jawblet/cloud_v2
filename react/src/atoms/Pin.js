import React from 'react';

const Pin = ({path, ...props}) => {
    const pathStyle = {
        position: "absolute",
        top: props.y,
        left: props.x,
    }

    return (
        <div className="pin" style={path ? pathStyle : ''}>
        </div>);
}
 
export default Pin;