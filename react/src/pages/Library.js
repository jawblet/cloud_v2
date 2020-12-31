import React, { useEffect, useState } from 'react';
import Header from '../sections/Header'
import RichEditor from '../components/upload/library/RichEditor';
import CTA from '../components/btns/CTA';
import Inbox from '../sections/Inbox';
import useRichEditor from '../hooks/posts/useRichEditor';
import useLibrary from '../hooks/useLibrary';
 
export default function Library() {
    const nav = [ {name: 'library', url: 'library'} ];
    const limit = 10;

    const { getLibraryBooks, 
        handleLibrarySubmit, 
        threads, 
        handleLibraryBookDelete,
        page,
        setPage } = useLibrary(limit);

        useEffect(() => {
            getLibraryBooks();
        }, []);

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

   const sendSubmit = (e) => {
       e.preventDefault(); 
       const data = editorState.getCurrentContent();
       handleLibrarySubmit(data, title);
       clearEditor(); // clear editor on submit 
   }
 
const [showEdit, setEditor] = useState(false);

    return ( 
        <div className="page">
          <Header nav={nav}/>
            <h3 className="page__title" style={{marginLeft:0}}>
              House
            </h3>
          <div className="room">
              <div className="library__body">
              {showEdit &&  
                <form onSubmit={sendSubmit}>
                    <RichEditor title={title}
                                onTitleChange={onTitleChange}
                                editorState={editorState} 
                                onNoteChange={onNoteChange}
                                mapKeyToEditorCommand={mapKeyToEditorCommand}
                                handleKeyCommand={handleKeyCommand} 
                                toggleInlineStyle={toggleInlineStyle}
                                toggleBlockType={toggleBlockType}
                                />
                    <div className="inlineForm__submit" style={{justifyContent:'flex-end'}}>
                            <CTA name={"finish"} 
                                type={"submit"}/> 
                    </div>
                </form>
                }
              </div> 
              <div className="library__sidebar">
                <h4>threads</h4>
                    <Inbox threads={threads} limit={limit}
                            handleLibraryBookDelete={handleLibraryBookDelete}
                            page={page}
                            setPage={setPage}
                    />
              </div>
          </div>
        </div>
    )
};

//<Thread/>