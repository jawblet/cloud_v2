import React, { useEffect, useRef } from 'react';
import { Editor } from 'draft-js';
import useEditor from './../../hooks/useEditor';

const TextUpload = () => {
    const editRef = useRef(null);
    const { editorState, setEditorState } = useEditor();

    useEffect(() => {
        editRef.current.focus();
    }, [])
    
    return (
        <Editor editorState={editorState} 
                onChange={setEditorState}
                ref={editRef}/>
        )
    }

export default TextUpload;