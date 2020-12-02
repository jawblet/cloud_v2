import React, {useRef, useEffect} from 'react';
import Header from '../sections/Header'
import { Editor } from 'draft-js';
import useRichEditor from '../hooks/useRichEditor';
import Toolbar from '../components/btns/Toolbar';

export default function Library() {
    const editRef = useRef(null);
    const nav = [ {name: 'library', url: 'library'} ];

    const {editorState, setEditorState, 
            onNoteChange, mapKeyToEditorCommand, 
            handleKeyCommand, toggleInlineStyle,
            toggleBlockType} = useRichEditor();

    useEffect(() => {
        editRef.current.focus();
    }, [toggleInlineStyle]);

    return(
        <div className="page">
          <Header nav={nav}/>
          <h3 className="page__title">Library</h3>
          <div className="room">
              <div className="room__body">
                <h4>House rules</h4>
                <Toolbar editorState={editorState}
                        onToggleInline={toggleInlineStyle}
                        toggleBlockType={toggleBlockType}

                    />
                <div className="libraryWrapper">
                    <Editor editorState={editorState} 
                    onChange={setEditorState}
                    ref={editRef} spellCheck={true}
                    onChange={onNoteChange}
                    handleKeyCommand={handleKeyCommand}
                    mapKeyToEditorCommand={mapKeyToEditorCommand}
                    />
                 </div>
              </div>
              <div className="room__sidebar">
                <h4>Versions</h4>
              </div>
          </div>
        </div>
    )
};