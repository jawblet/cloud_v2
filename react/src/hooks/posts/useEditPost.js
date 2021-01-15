import React, { useContext, useState, useEffect } from 'react';  
import { UserContext } from '../UserContext';
import { EditorState, convertFromRaw, CompositeDecorator, RichUtils, getDefaultKeyBinding } from 'draft-js';

export default function useEditPost() {
    const { globalTags } = useContext(UserContext);
    const tags = globalTags;
    let tagNames;
    if(tags && tags.length > 0) { tagNames = tags.map(el => el.tag); }
 
    const editRef = React.createRef();

    const [isReadOnly, setEditable] = useState(true);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    
    const onNoteChange = (editorState) => { setEditorState(editorState); }
    const editNote = () => { setEditable(!isReadOnly); }

    useEffect(() => {
        if(!isReadOnly) { //set note in focus if it's being edited 
        editRef.current.focus();
        }
    }, [isReadOnly]);

        //display notes on tiles and detail pg 
        const displayNoteBody = async (post) => { 
            const contentState = convertFromRaw(JSON.parse(post.content)); 
            let newEditorState; 

            if (tagNames) { // decorate tags if tags exist/have been retrieved 
                const TAGS_REGEX = new RegExp(tagNames.join("|"), "gi");
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
                        )}

                    const decorator = new CompositeDecorator([
                        { strategy: findTags,
                        component: highlightSpan }
                    ]);

                newEditorState = EditorState.createWithContent(contentState, decorator); 
                return setEditorState(newEditorState);

                } else { // without tags, just fill content 
                    console.log('no tags');
                    newEditorState = EditorState.createWithContent(contentState); 
                return setEditorState(newEditorState);
                } 
            }

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
        tags,
        displayNoteBody,
        editorState,
        setEditorState,
        onNoteChange,
        editNote,
        isReadOnly,
        handleKeyCommand,
        mapKeyToEditorCommand,
        toggleInlineStyle,
        toggleBlockType,
        setFocus,
        editRef
    }
}

