import React from 'react';
import RichEditor from '../../components/upload/library/RichEditor';
import useRichEditor from '../../hooks/posts/useRichEditor';

const NewDoc = () => {
    const { 
        title,
        onTitleChange,
        editorState, 
        onNoteChange, 
        clearEditor, 
        mapKeyToEditorCommand, 
        handleKeyCommand, 
        toggleInlineStyle, 
        toggleBlockType 
    } = useRichEditor();

    return (
        <div>
               <RichEditor title={title}
                            onTitleChange={onTitleChange}
                            editorState={editorState} 
                            onNoteChange={onNoteChange}
                            mapKeyToEditorCommand={mapKeyToEditorCommand}
                            handleKeyCommand={handleKeyCommand} 
                            toggleInlineStyle={toggleInlineStyle}
                            toggleBlockType={toggleBlockType}
                            styledToolbar={false}
                            />
        </div>
    );
}
 
export default NewDoc;