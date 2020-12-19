import React, { useEffect } from 'react';
import Header from '../sections/Header'
import RichEditor from '../components/upload/library/RichEditor';
import CTA from '../components/btns/CTA';
import Inbox from '../sections/Inbox';
import useRichEditor from '../hooks/useRichEditor';
import useLibrary from '../hooks/useLibrary';

export default function Library() {
    const nav = [ {name: 'library', url: 'library'} ];

    const { getLibraryBooks, handleLibrarySubmit, threads, handleLibraryBookDelete } = useLibrary();

    useEffect(() => {
        getLibraryBooks();
    }, []);

    const { editorState, onNoteChange, clearEditor, mapKeyToEditorCommand, handleKeyCommand, toggleInlineStyle, toggleBlockType 
    } = useRichEditor();

   const sendSubmit = (e) => {
       e.preventDefault(); 
       const data = editorState.getCurrentContent();
       handleLibrarySubmit(data);
       clearEditor(); // clear editor on submit 
   }
 
    return(
        <div className="page">
          <Header nav={nav}/>
          <h3 className="page__title">Library</h3>
          <div className="room">
              <div className="library__body">
                <form onSubmit={sendSubmit}>
                    <RichEditor editorState={editorState} 
                                onNoteChange={onNoteChange}
                                mapKeyToEditorCommand={mapKeyToEditorCommand}
                                handleKeyCommand={handleKeyCommand} 
                                toggleInlineStyle={toggleInlineStyle}
                                toggleBlockType={toggleBlockType}
                                />
                    <div className="inlineForm__submit" style={{justifyContent:'flex-end'}}>
                            <CTA name={"finish"} type={"submit"}/> 
                    </div>
                </form>
              </div>
              <div className="library__sidebar">
                <h4>threads</h4>
                    <Inbox threads={threads} 
                            handleLibraryBookDelete={handleLibraryBookDelete}
                    />
              </div>
          </div>
        </div>
    )
};