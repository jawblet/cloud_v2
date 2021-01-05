import React, { useRef, useEffect } from 'react';
import InlineButton from '../../components/btns/InlineButton'; 
import { Editor } from 'draft-js';
import Toolbar from '../../components/btns/Toolbar';
import useScrollToBottom from '../../hooks/useScrollToBottom';
import { animateScroll } from 'react-scroll';

//write a rich comment w/ draft js
const RichComment = (props) => {
    const { scrollToBottom, scrollRef } = useScrollToBottom(); 
    const editRef = useRef(null);

    const { 
        handleSubmit,
        editorState, 
        onNoteChange, 
        mapKeyToEditorCommand, 
        handleKeyCommand, 
        toggleInlineStyle,
        toggleBlockType } = props;

    useEffect(() => { 
        editRef.current.focus();
        scrollToBottom();
    }, []);

    return (
            <div ref={scrollRef}>
              <Toolbar 
                        editorState={editorState}
                        onToggleInline={toggleInlineStyle}
                        toggleBlockType={toggleBlockType}
                        //setFocus={setFocus}
                        addTag={false}/> 
            <div className="editorWrapper editorWrapper--inline" onClick={() => editRef.current.focus()}>
                <Editor ref={editRef} 
                        editorState={editorState} 
                        spellCheck={true}
                        handleKeyCommand={handleKeyCommand}
                        mapKeyToEditorCommand={mapKeyToEditorCommand}
                        onChange={onNoteChange} 
                        />
            </div>
            <div className="threadDraft__submit"> 
                <InlineButton name="discard" type="button"/>
                <InlineButton name="finish" type="submit" outline={true} handleClick={handleSubmit}/>
            </div>
        </div>
    );
}
 
export default RichComment;