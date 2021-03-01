import React from 'react';

const EmptyIcon = ({l, ...props}) => {
    return (    
    <svg width={l} height={l} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="99" height="99" rx="9.5" stroke={props.stroke}/>
    </svg>
    );
}
 
export default EmptyIcon;