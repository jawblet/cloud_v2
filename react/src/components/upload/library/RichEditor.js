import React, { useRef, useEffect } from 'react';
import { Editor } from 'draft-js';
import Toolbar from '../../btns/Toolbar';

export default function RichEditor(props) { 
    const { title, 
            onTitleChange, 
            editorState, 
            onNoteChange, 
            mapKeyToEditorCommand,
            handleKeyCommand, 
            toggleInlineStyle, 
            toggleBlockType } = props;
    
    const editRef = useRef(null);

       useEffect(() => { 
           editRef.current.focus();
        }, []);

    
    return(
      <>
            <Toolbar editorState={editorState}
                    onToggleInline={toggleInlineStyle}
                    toggleBlockType={toggleBlockType}
                /> 
            <div className="editorWrapper--lib">
                <input type="text" 
                                className="input editor__title"
                                disabled={false}
                                name="title"
                                value={title}
                                onChange={onTitleChange}
                            />
                <div className="editorWrapper"  onClick={() => editRef.current.focus()}> 
                    <Editor editorState={editorState} 
                    ref={editRef} spellCheck={true}
                    onChange={onNoteChange}
                    handleKeyCommand={handleKeyCommand}
                    mapKeyToEditorCommand={mapKeyToEditorCommand}
                    />
                </div>
            </div>
        </>

    )
}
