import React from 'react';

export default function ExpandButton( {squeeze} ) {
    let margin; 
    squeeze ? margin = '2px' : margin = '6px'; 
    return(
        <>
       <div className="flex column"> 
            <d is="dot" style={{margin:margin}}></d>
            <d is="dot" style={{margin:margin}}></d>
        </div>

        <div className="flex column">
            <d is="dot" style={{margin:margin}}></d>
            <d is="dot" style={{margin:margin}}></d>
        </div>
        </>
    )
}