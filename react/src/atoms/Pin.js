import React from 'react';

const Pin = ({ path, ...props }) => {

    const pathStyle = {
        position: "absolute",
        top: props.y,
        left: props.x,
    }

    return (
        <div className="pin">
        </div>);
}
 
export default Pin;

/*
 const pathStyle = {
        position: "absolute",
        top: props.y,
        left: props.x,
    }

style={path ? pathStyle : ''}

*/