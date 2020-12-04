import { useState, useEffect, useContext } from 'react';
import { EditorState, CompositeDecorator } from 'draft-js';
import { UserContext } from './UserContext';
import axios from 'axios';  


export default function useEditor() {
    const { user } = useContext(UserContext);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onNoteChange = (editorState) => {
        setEditorState(editorState);  
      }

//define and set decorator to find tags while writing note
useEffect(async () => {
    let tags;
    let tagNames; 
    await axios.get(`/tags/h/${user.house._id}`).then(res => {
        tags = res.data.data.results;
        tagNames = tags.map(el => el.tag);
    }).catch(err => console.log(err));

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
            )
        }

        const decorator = new CompositeDecorator([
            { strategy: findTags,
              component: highlightSpan }
        ]);

        const contentState = editorState.getCurrentContent(); 
        const newEditorState = EditorState.createWithContent(contentState, decorator);
        setEditorState(newEditorState);
    }, []); 


    return {
        editorState, 
        setEditorState,
        onNoteChange
    }
}