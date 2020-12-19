import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Editor } from 'draft-js';
import Toolbar from '../btns/Toolbar';
import { CSSTransition } from 'react-transition-group';

const NoteUpload = forwardRef((props, ref) => {
    const { editorState, onNoteChange, mapKeyToEditorCommand, setFocus, 
        handleKeyCommand, toggleInlineStyle, toggleBlockType } = props;
        
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
        <>
            <Toolbar editorState={editorState}
                        onToggleInline={toggleInlineStyle}
                        toggleBlockType={toggleBlockType}
                        setFocus={setFocus} /> 
            <CSSTransition 
            in={note} timeout={350} 
            nodeRef={nodeRef} classNames="rollDown"
            unmountOnExit>
                <div className="upload upload--note" ref={nodeRef}>
                <div className="editorWrapper editorWrapper--note" onClick={setFocus}> 
                    <Editor editorState={editorState} 
                        ref={ref} spellCheck={true}
                        onChange={onNoteChange}
                        handleKeyCommand={handleKeyCommand}
                        mapKeyToEditorCommand={mapKeyToEditorCommand}
                    />
                </div>
                </div>
            </CSSTransition>
            </>
        )
    })

export default NoteUpload;







/*
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

*/