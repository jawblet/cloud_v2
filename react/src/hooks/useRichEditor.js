import { useState } from 'react';
import { EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';

export default function useRichEditor() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onNoteChange = (editorState) => {
        setEditorState(editorState);  
      } 

    // clear editor 
    const clearEditor = () => {
      setEditorState(EditorState.createEmpty()); 
    }

    //handle keyboard shortcuts like cmd+b for bold 
    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if(newState) {
            onNoteChange(newState);
            return 'handled';   
        }
        return 'not-handled';
    };

    const mapKeyToEditorCommand = (e) => {
        if (e.keyCode === 9 /* TAB */) {
          const newEditorState = RichUtils.onTab(
            e,
            editorState,
            4, /* maxDepth */
          );
          if (newEditorState !== editorState) {
            onNoteChange(newEditorState);
          } 
          return;
        }
        return getDefaultKeyBinding(e);
      }

    //style functions
    const toggleInlineStyle = (e) => {
        e.preventDefault();
        let inlineStyle = e.currentTarget.dataset.id;
        onNoteChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
      }

    const toggleBlockType = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.dataset.id);
        let blockType = e.currentTarget.dataset.id;
        onNoteChange(RichUtils.toggleBlockType(editorState, blockType));
      }

    return {
        editorState,
        setEditorState,
        onNoteChange,
        mapKeyToEditorCommand,
        handleKeyCommand,
        toggleInlineStyle,
        toggleBlockType,
        clearEditor
    }
}