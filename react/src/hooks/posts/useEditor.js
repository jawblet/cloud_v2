import React, { useState, useEffect, useContext } from 'react';
import { EditorState, CompositeDecorator, RichUtils, getDefaultKeyBinding } from 'draft-js';
import { UserContext } from '../UserContext';

export default function useEditor() {
    const { globalTags } = useContext(UserContext);
    const tags = globalTags;
    const editRef = React.createRef();

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onNoteChange = (editorState) => {
        setEditorState(editorState);  
      }
    
useEffect(() => { 
    let tagNames = []; 

    if(globalTags.length !== 0) { // check if tags exist  
        tagNames = tags.map(el => el.tag);
        const TAGS_REGEX = new RegExp(tagNames.join("|"), "gi"); // create regex to search for names 

        const findWithRegex = (regex, contentBlock, callback) => {
            const text = contentBlock.getText();
            let matchArr, start, end;
            while ((matchArr = regex.exec(text)) !== null) {
                start = matchArr.index;
                end = start + matchArr[0].length;
                callback(start, end);
            }
        }

        function findTags(contentBlock, callback, contentState) {
            findWithRegex(TAGS_REGEX, contentBlock, callback);
        };
    
        const highlightSpan = (props) => {
            const tag = props.decoratedText.toLowerCase();
            const c = tags.find(obj => obj.tag === tag).color;   
            return (
                <span className="editorTag" style={{ backgroundColor: c }}>
                    {props.children}
                </span>
                )
            }; 
    
            const decorator = new CompositeDecorator([ 
                { strategy: findTags,
                  component: highlightSpan }
            ]); 
    
            const contentState = editorState.getCurrentContent(); 
            const newEditorState = EditorState.createWithContent(contentState, decorator);
            return setEditorState(newEditorState);
    }

        //if no tags, return editor w/o decorator 
        const contentState = editorState.getCurrentContent(); 
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
    }, [globalTags]); //update on new tag

//rich text fxns
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
            e.preventDefault();
            const newEditorState = RichUtils.onTab(e, editorState, 4);
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
            let blockType = e.currentTarget.dataset.id;
            onNoteChange(RichUtils.toggleBlockType(editorState, blockType));
        }

        const setFocus = () => {
            editRef.current.focus();
        };

    return {
        editorState, 
        setEditorState,
        onNoteChange,
        handleKeyCommand,
        mapKeyToEditorCommand,
        toggleInlineStyle,
        toggleBlockType,
        editRef,
        setFocus,
    }
}