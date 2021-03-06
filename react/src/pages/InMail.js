import React, { useEffect, useRef } from 'react';
import RichEditor from '../components/upload/library/RichEditor';
import CTA from '../components/btns/CTA';
import InlineButton from '../components/btns/InlineButton';
import Inbox from '../sections/Inbox';
import useRichEditor from '../hooks/posts/useRichEditor';
import useLibrary from '../hooks/useLibrary';
import useShowEditor from '../hooks/threads/useShowEditor';
import { CSSTransition } from 'react-transition-group';

export default function House() {
    const nodeRef = useRef(null);
    const limit = 6;  

    const { getLibraryBooks, 
        handleLibrarySubmit, 
        threads, 
        handleLibraryBookDelete,
        pageState,
        handlePageCounter
    } = useLibrary(limit);

        useEffect(() => {
            getLibraryBooks(1); 
        }, []); 

    const { showEdit, setEditor } = useShowEditor();
    
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
       setEditor(false); 
   }; 
 
    return (
        <>
            <h2 className="page__title" style={{marginLeft:0}}>
              House
            </h2>
          <div className="layer inmail">
              <div className="house__compose"> 
                  {showEdit 
                        ? <InlineButton name="close" handleClick={() => setEditor(!showEdit)}/>
                        : <CTA name="new thread" kind="primary" handleClick={() => setEditor(!showEdit)}/> 
                    }
              </div>
                    <CSSTransition 
                    in={showEdit} timeout={350} 
                    nodeRef={nodeRef} classNames="rollDownFadeOut"
                    unmountOnExit>
                        <form style={{transformOrigin:'top'}} 
                                onSubmit={sendSubmit} ref={nodeRef}>
                            <RichEditor title={title}
                                        onTitleChange={onTitleChange}
                                        editorState={editorState} 
                                        onNoteChange={onNoteChange}
                                        mapKeyToEditorCommand={mapKeyToEditorCommand}
                                        handleKeyCommand={handleKeyCommand} 
                                        toggleInlineStyle={toggleInlineStyle}
                                        toggleBlockType={toggleBlockType}
                                        styledToolbar={true}
                                        />
                            <div className="inlineForm__submit" style={{justifyContent:'flex-end'}}>
                                    <CTA name="finish" kind="primary" type="submit"/> 
                            </div>
                        </form>
                    </CSSTransition> 
                        <h4 className="heavy" style={{paddingBottom:'0.5rem', cursor:'pointer'}} 
                            onClick={() => handlePageCounter(1)}>
                            threads
                        </h4>
                    <Inbox threads={threads} 
                            handleLibraryBookDelete={handleLibraryBookDelete}
                            pageState={pageState}
                            handlePageCounter={handlePageCounter}
                    />
            </div>
        </>
    )
};

