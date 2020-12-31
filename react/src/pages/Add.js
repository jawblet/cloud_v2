import React, { useContext, useState } from 'react'; 
import Header from '../sections/Header';
import Drawer from '../components/Drawer';
import AddPost from '../sections/AddPost';
import AddLayer from '../sections/AddLayer';
import { UserContext } from '../hooks/UserContext';
import useEditor from '../hooks/posts/useEditor';
import useUpload from '../hooks/upload/useUpload';

 export default function Add(props) { 
    const { user, rooms, globalTags } = useContext(UserContext);
    const [addPost, setAdd] = useState(true);

    //set room from state, or default to first room in roomArr 
    const roomFrom = props.location.state || rooms[0];
    const nav = [ {name: roomFrom.label, url: roomFrom.slug } ];
    
    const [type, setType]= useState('link'); //set upload type 
    const switchType = (e) => { setType(e.currentTarget.dataset.label); }
     
         //handle editor state 
         const { editorState, 
            onNoteChange, 
            mapKeyToEditorCommand, 
            editRef, 
            setFocus,
            handleKeyCommand,
            toggleInlineStyle,
            toggleBlockType,
             } = useEditor();
    
           //handle page state 
           const { values, 
            handleChange, 
            selectItem, 
            searchRef, 
            addTags, 
            results,
            selectTag, 
            clearInput, 
            removeTag, 
            handleKeyDown,
            addTagFromNote } = useUpload({
                        initialValues: {
                        content: '',
                        input: '', 
                        tags: [],
                        comment: '',
                        house: user.house,
                        user: user._id,
                        room: roomFrom.id,
                        roomName: roomFrom.label,
                        error: null 
                    }
                });

     return ( 
        <div className="page"> 
            <Header nav={nav}/>
            {addPost 
                ? <AddPost roomFrom={roomFrom} 
                        rooms={rooms}
                        setAdd={setAdd}
                        type={type} 
                        switchType={switchType} 
                        values={values} 
                        handleChange={handleChange} 
                        selectItem={selectItem}
                        searchRef={searchRef} 
                        addTags={addTags} 
                        results={results} 
                        selectTag={selectTag}
                        clearInput={clearInput} 
                        removeTag={removeTag} 
                        handleKeyDown={handleKeyDown}  
                        editorState={editorState} 
                        onNoteChange={onNoteChange}
                        mapKeyToEditorCommand={mapKeyToEditorCommand}
                        handleKeyCommand={handleKeyCommand}
                        toggleInlineStyle={toggleInlineStyle}
                        toggleBlockType={toggleBlockType}
                        editRef={editRef}
                        setFocus={setFocus}
                        addTagFromNote={addTagFromNote}
                        />
                : <AddLayer setAdd={setAdd}/>
            }
            <span className="fixedTab">
                <Drawer items={globalTags} tab={"house paths"} />
            </span>
        </div>
    )
}
