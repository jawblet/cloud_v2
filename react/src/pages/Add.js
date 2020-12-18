import React, { useContext, useState } from 'react'; 
import Header from '../sections/Header';
import { UserContext } from '../hooks/UserContext';
import CTA from '../components/btns/CTA'; 
import UploadContainer from '../components/upload/UploadContainer';
import SelectMenu from '../components/SelectMenu';
import Drawer from '../components/Drawer';
import useEditor from '../hooks/useEditor';
import useUpload from '../hooks/useUpload';
import useSubmit from '../hooks/useSubmit';

 export default function Add(props) { 
    const { user, rooms, globalTags } = useContext(UserContext);

    //breadcrumbs
    const roomFrom = props.location.state || 'kitchen';
    const nav = [ {name: roomFrom, url: roomFrom } ];
 
    //set upload type 
    const [type, setType]= useState('link');
    const switchType = (e) => { setType(e.currentTarget.dataset.id); }

    //handle editor state 
    const { editorState, onNoteChange } = useEditor();

    //handle page state 
    const { values, handleChange, selectItem, 
            searchRef, addTags, results,
            selectTag, clearInput, removeTag, handleKeyDown } = useUpload({
            initialValues: {
            content: '',
            input: '',
            tags: [],
            comment: '',
            house: user.house,
            user: user._id,
            room: roomFrom,
            error: null 
        }
    });

    const { handleLinkSubmit, handleNoteSubmit, error } = useSubmit();

    const sendSubmit = (e) => {
        e.preventDefault();
        switch(type) {
            case 'link': handleLinkSubmit({ values });
            break;
            case 'note': //convert draft-js to a string 
                const data = editorState.getCurrentContent();
                handleNoteSubmit(values, data);
            break;
            default: handleLinkSubmit({ values });
        }
    }

     return ( 
        <div className="page"> 
            <Header nav={nav}/>
            <form style={{width:'75%'}} onSubmit={sendSubmit}>
                <UploadContainer type={type} 
                                switchType={switchType} 
                                results={results} 
                                room={roomFrom} values={values} 
                                handleChange={handleChange} 
                                searchRef={searchRef} 
                                clearInput={clearInput} 
                                removeTag={removeTag} 
                                addTags={addTags} 
                                selectTag={selectTag}
                                editorState={editorState} 
                                onNoteChange={onNoteChange}
                                error={error}  
                                handleKeyDown={handleKeyDown}   
                                />
                <div className="inlineForm__submit" style={{justifyContent:'flex-end', paddingTop:'3rem'}}>
                    <div className="flex alignCenter" style={{marginRight:'3rem'}}> 
                        <h4>Place in</h4> 
                        <SelectMenu items={rooms} active={values.room} selectItem={selectItem}/> 
                    </div>  
                        <CTA name={"add"} type={"submit"}/> 
                    </div>
            </form>
            <span className="fixedTab">
                <Drawer items={globalTags} tab={"house paths"} />
            </span>
        </div>
    )
}
