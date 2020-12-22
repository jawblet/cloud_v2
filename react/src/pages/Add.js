import React, { useContext, useState, useEffect } from 'react'; 
import Header from '../sections/Header';
import { UserContext } from '../hooks/UserContext';
import Drawer from '../components/Drawer';
import AddPost from '../sections/AddPost';
import AddRoom from '../sections/AddRoom';
import useEditor from '../hooks/useEditor';
import useUpload from '../hooks/useUpload';

 export default function Add(props) { 
    const { user, globalTags } = useContext(UserContext);
    const rooms = user.house.rooms;
    const [addPost, setAdd] = useState(true);

    //set room from state, or default to first room in roomArr 
    const roomFrom = props.location.state || rooms[0];
    const nav = [ {name: roomFrom.label, url: roomFrom.slug } ];
         //set upload type 
         const [type, setType]= useState('link');
         const switchType = (e) => { setType(e.currentTarget.dataset.id); }
     
         //handle editor state 
         const { editorState, 
            onNoteChange, 
            mapKeyToEditorCommand, 
            editRef, 
            setFocus,
            handleKeyCommand,
            toggleInlineStyle,
            toggleBlockType } = useEditor();
    
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
            handleKeyDown } = useUpload({
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
                        />
                : <AddRoom setAdd={setAdd}/>
            }
            <span className="fixedTab">
                <Drawer items={globalTags} tab={"house paths"} />
            </span>
        </div>
    )
}
