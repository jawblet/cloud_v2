import React, { useEffect, useRef } from 'react';
import { Editor } from 'draft-js';

const NoteUpload = (props) => {
    const { editorState, onNoteChange } = props; 
    const editRef = useRef(null);

    useEffect(() => {
        editRef.current.focus(); 
    }, []);
    
    return (
        <div className="editorWrapper">
            <Editor editorState={editorState} 
                    ref={editRef}
                    onChange={onNoteChange}
                    spellCheck={true}
                    />
        </div>
        )
    }

export default NoteUpload;