import React, { useRef, useEffect } from 'react';
import { Editor } from 'draft-js';
import useRichEditor from '../../../hooks/useRichEditor';
import Toolbar from '../../btns/Toolbar';

export default function RichEditor(props) { 
    const { editorState, onNoteChange, mapKeyToEditorCommand,
        handleKeyCommand, toggleInlineStyle, toggleBlockType } = props;
    
    const editRef = useRef(null);

        useEffect(() => { 
            editRef.current.focus();
        }, [toggleInlineStyle]);
    
    return(
        <div style={{border:'1px solid lightgray', borderRadius:'0.5rem'}}>
            <Toolbar editorState={editorState}
                    onToggleInline={toggleInlineStyle}
                    toggleBlockType={toggleBlockType}
                /> 
            <div className="editorWrapper"> 
                <Editor editorState={editorState} 
                ref={editRef} spellCheck={true}
                onChange={onNoteChange}
                handleKeyCommand={handleKeyCommand}
                mapKeyToEditorCommand={mapKeyToEditorCommand}
                />
            </div>
        </div>

    )
}

/*
   // const { mapKeyToEditorCommand, 
    //  handleKeyCommand, toggleInlineStyle, toggleBlockType } 
    // = useRichEditor();
*/
