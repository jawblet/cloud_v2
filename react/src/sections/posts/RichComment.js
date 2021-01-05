import React, { useRef, useEffect } from 'react';
import InlineButton from '../../components/btns/InlineButton'; 
import { Editor } from 'draft-js';
import Toolbar from '../../components/btns/Toolbar';

//write a rich comment w/ draft js
const RichComment = (props) => {
    const editRef = useRef(null);
    const { 
        handleSubmit,
        editorState, 
        onNoteChange, 
        clearEditor, 
        mapKeyToEditorCommand, 
        handleKeyCommand, 
        toggleInlineStyle, 
        toggleBlockType } = props;

    useEffect(() => { 
        editRef.current.focus();
    }, []);

    return (
        <div className="commentDraft">
              <Toolbar 
                        editorState={editorState}
                        onToggleInline={toggleInlineStyle}
                        toggleBlockType={toggleBlockType}
                        //setFocus={setFocus}
                        addTag={false}/> 
            <div className="editorWrapper editorWrapper--inline" onClick={() => editRef.current.focus()}>
                <Editor 
                        editorState={editorState} 
                        ref={editRef} spellCheck={true}
                        handleKeyCommand={handleKeyCommand}
                        mapKeyToEditorCommand={mapKeyToEditorCommand}
                        onChange={onNoteChange} 
                        />
            </div>
            <div className="commentDraft__submit"> 
                <InlineButton name="discard" type="button"/>
                <InlineButton name="finish" type="submit" outline={true} handleClick={handleSubmit}/>
            </div>
        </div>
    );
}
 
export default RichComment;