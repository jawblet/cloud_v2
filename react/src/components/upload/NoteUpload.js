import React, { useEffect, useRef } from 'react';
import { Editor } from 'draft-js';
import useEditor from './../../hooks/useEditor';
 
const NoteUpload = (props) => {
    const { editorState, onNoteChange } = props; 
    const editRef = useRef(null);
    const { setEditorState } = useEditor();

    useEffect(() => {
        editRef.current.focus();
    }, []);
    
    return (
        <Editor editorState={editorState} 
                onChange={setEditorState}
                ref={editRef}
                onChange={onNoteChange}
                spellCheck={true}
                />
        )
    }

export default NoteUpload;