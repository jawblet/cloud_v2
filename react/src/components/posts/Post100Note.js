import React, { useRef } from 'react';
import { Editor } from 'draft-js'; 


const Post100Note = ({editorState, 
                setEditorState, 
                onNoteChange}) => {
                    
    const editRef = useRef(null); 

    return (
    <div className="post100__body__note">
        <Editor readOnly={true} 
        editorState={editorState} ref={editRef}
        setEditorState={setEditorState}
        onChange={onNoteChange} />
    </div>   
    );
}
 
export default Post100Note;