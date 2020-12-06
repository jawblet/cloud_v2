import { useState, useEffect, useContext } from 'react';
import { EditorState, CompositeDecorator } from 'draft-js';
import { UserContext } from './UserContext';

export default function useEditor() {
    const { globalTags } = useContext(UserContext);
    const tags = globalTags;

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onNoteChange = (editorState) => {
        setEditorState(editorState);  
      }


//   How to add tags in the search bar + have them dynamically be addable in the note   // 

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
            }
    
            const decorator = new CompositeDecorator([
                { strategy: findTags,
                  component: highlightSpan }
            ]);
    
            const contentState = editorState.getCurrentContent(); 
            const newEditorState = EditorState.createWithContent(contentState, decorator);
            return setEditorState(newEditorState);
    }

    //if no tags, return editor 
    const contentState = editorState.getCurrentContent(); 
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
    }, []); 

    return {
        editorState, 
        setEditorState,
        onNoteChange
    }
}