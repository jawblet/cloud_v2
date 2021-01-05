import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Editor } from 'draft-js';
import Toolbar from '../btns/Toolbar';
import { CSSTransition } from 'react-transition-group';

const NoteUpload = forwardRef((props, ref) => {
    const { editorState, onNoteChange, mapKeyToEditorCommand, setFocus, 
        handleKeyCommand, toggleInlineStyle, toggleBlockType, addTagFromNote } = props;
        
        const [note, setNote] = useState(false);
        const nodeRef = useRef(null);

        useEffect(() => { 
            setNote(true);   
        }, [note]); 
        
        useEffect(() => {
            if(note) {
                setFocus();
            }
        }, [note]);
 
    return (
        <span style={{position:'relative'}}>
            <Toolbar editorState={editorState}
                        onToggleInline={toggleInlineStyle}
                        toggleBlockType={toggleBlockType}
                        setFocus={setFocus}
                        addTagFromNote={addTagFromNote}
                        addTag={true}
                        styled={true} /> 
            <CSSTransition 
            in={note} timeout={350} 
            nodeRef={nodeRef} classNames="rollDown"
            unmountOnExit>
                <div className="editorWrapper editorWrapper--block" ref={nodeRef} onClick={setFocus}> 
                    <Editor editorState={editorState} 
                        ref={ref} spellCheck={true}
                        onChange={onNoteChange}
                        handleKeyCommand={handleKeyCommand}
                        mapKeyToEditorCommand={mapKeyToEditorCommand}
                    />
                </div> 
            </CSSTransition>
            </span>
        )
    })

export default NoteUpload;



