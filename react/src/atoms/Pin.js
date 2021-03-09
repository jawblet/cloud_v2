import React, { useState } from 'react';
import Preview from '../components/modals/Preview';

const Pin = ({ path, ...props }) => {
    const [preview, showPreview] = useState(false);

    const pathStyle = {
        position: "absolute", 
        top: props.y || 'auto',
        left: props.x || 'auto'
    }

    if(path) {
        return ( 
            <>
            <Preview preview={preview} 
                tags={props.tags}
                post={props.post} />
            <div style={ pathStyle }>
                <div style={{position:'relative'}}>
                    <span className="pin__color" style={{backgroundColor:props.color}} 
                            // onMouseEnter={() => showPreview(true)}
                            // onMouseLeave={() => showPreview(false)} 
                            >
                    </span>
                    <div className="pin pin__path" style={{ position: "absolute", backgroundColor:props.color}}>
                    </div>
                </div>
            </div> 
            </>
        );
    }

   return (
       <>
        <Preview preview={preview} 
                tags={props.tags}
                post={props.post} />
        <div className="pin" onMouseEnter={() => showPreview(true)}
                            onMouseLeave={() => showPreview(false)}>
        </div>
        </>
   )}

export default Pin;
