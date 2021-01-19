import React from 'react';

const GroupIcon = ({l, name}) => {
    return (
        <svg width={l} height={l} viewBox="0 0 100 100" fill="none" 
        className={name}
        xmlns="http://www.w3.org/2000/svg"> 
            <rect x="0.5" y="0.5" width="100" height="100" 
                stroke="currentColor" 
                strokeDasharray="20" 
                strokeWidth="10"
            />
        </svg>
    );
}
 
export default GroupIcon;