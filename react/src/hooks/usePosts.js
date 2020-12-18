import React, { useContext, useState } from 'react';  
import { UserContext } from './UserContext';
import { EditorState, convertFromRaw, CompositeDecorator } from 'draft-js';

export default function usePosts() {
    const { globalTags } = useContext(UserContext);
    const tags = globalTags;
    let tagNames;
    if(tags && tags.length > 0) { tagNames = tags.map(el => el.tag); }
  
    const [isReadOnly, setEditable] = useState(true);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    
    const onNoteChange = (editorState) => { setEditorState(editorState); }
    const editNote = () => { setEditable(!isReadOnly); }

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

    return {
        tags,
        displayNoteBody,
        editorState,
        setEditorState,
        onNoteChange,
        editNote,
        isReadOnly
    }
}

