import React, { useRef } from 'react';
import RichComment from './RichComment';
import useRichEditor from '../../hooks/posts/useRichEditor'; 
import useThreadComments from '../../hooks/threads/useThreadComments';
import { Editor, convertToRaw, EditorState, convertFromRaw } from 'draft-js';
import { CSSTransition } from 'react-transition-group';

const ThreadComments = (props) => {
    const nodeRef = useRef(null);
    const { id, showEdit, setEditor, thread } = props; 
    
    const { 
        editorState, 
        onNoteChange, 
        clearEditor, 
        mapKeyToEditorCommand, 
        handleKeyCommand, 
        toggleInlineStyle, 
        toggleBlockType,
    } = useRichEditor();

    const { comments, loading, handleAddComment } = useThreadComments(id);

    const handleSubmit = (e) => {
        e.preventDefault();
        const raw = editorState.getCurrentContent();
        const comment = JSON.stringify(convertToRaw(raw));
        handleAddComment(comment); 
        clearEditor();
    }

    return (
        <>
        <hr/>
        <div className="thread__comments">
           {!loading && comments.map(el => {
               const contentState = convertFromRaw(JSON.parse(el.comment));
               const editorState = EditorState.createWithContent(contentState);
               return (
                <div className="threadComment" key={el._id}>
                    <div className="thread__metadata" style={{paddingBottom:'0.5rem'}}>
                    <h4 className="thread__author"> {el.user.username} </h4>
                        <h4 className="thread__date"> {el.createdOn} </h4>
                    </div>
                    <Editor editorState={editorState} 
                            readOnly={true} /> 
                </div>
               )
           })}
            <CSSTransition 
                in={showEdit} timeout={250} 
                nodeRef={nodeRef} classNames="rollDownFadeOut" unmountOnExit>
                <div className="threadDraft" ref={nodeRef}>
                 <h4 className="heavy">reply to {thread} </h4>
                 <RichComment   setEditor={setEditor}
                                handleSubmit={handleSubmit}
                                editorState={editorState} 
                                onNoteChange={onNoteChange} 
                                mapKeyToEditorCommand={mapKeyToEditorCommand} 
                                handleKeyCommand={handleKeyCommand} 
                                toggleInlineStyle={toggleInlineStyle} 
                                toggleBlockType={toggleBlockType} />
                </div>
            </CSSTransition>
        </div>
        </>
      );
}
 
export default ThreadComments;

