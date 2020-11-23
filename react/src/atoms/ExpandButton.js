import React from 'react';

export default function ExpandButton( {squeeze} ) {
    let margin; 
    squeeze ? margin = '2px' : margin = '6px'; 
    return(
        <>
       <div className="flex column"> 
            <d style={{margin:margin}}></d>
            <d style={{margin:margin}}></d>
        </div>

        <div className="flex column">
            <d style={{margin:margin}}></d>
            <d style={{margin:margin}}></d>
        </div>
        </>
    )
}