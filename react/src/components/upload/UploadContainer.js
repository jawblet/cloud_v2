import React, { useState } from 'react';
import TextUpload from './TextUpload';
import DragUpload from './DragUpload';

export default function UploadContainer() {
    const [isDragUpload, setUpload] = useState(true);

    return(
        <div className="upload" onClick={() => setUpload(false)}>
            {isDragUpload 
            ?
                <DragUpload/>
            :
                <TextUpload/>
            }
        </div>
    )
}