import React from 'react';
import UploadContainer from '../components/upload/UploadContainer';
import RoomSelectMenu from '../components/menus/RoomSelectMenu';
import { VscArrowSmallRight } from 'react-icons/vsc';
import CTA from '../components/btns/CTA'; 

import useSubmit from '../hooks/useSubmit';

export default function AddPost(props) {
const { values, rooms, setAdd, editorState } = props; 

const { handleLinkSubmit, handleNoteSubmit, error } = useSubmit();

const sendSubmit = (e) => {
    e.preventDefault();
    switch(props.type) {
        case 'link': handleLinkSubmit({ values });
        break;
        case 'note': //convert draft-js to a string 
            const data = editorState.getCurrentContent();
            handleNoteSubmit(values, data);
        break; 
        default: handleLinkSubmit({ values });
    }
} 
    return(
        <form style={{width:'75%', marginTop:'3rem'}} onSubmit={sendSubmit}>
                    <div className="addRoom" style={{justifyContent:'flex-end'}}
                        onClick={() => setAdd(false)}>
                        <h5 className="light">Add room</h5> <VscArrowSmallRight className="icon icon__btn"/>
                    </div>
                    <UploadContainer {...props}
                                    error={error}  
                                    />
                    <div className="inlineForm__submit" style={{justifyContent:'flex-end', paddingTop:'3rem'}}>
                        <div className="flex alignCenter"> 
                            <h4>Place in</h4> 
                            <RoomSelectMenu items={rooms} 
                            active={values.roomName} 
                            selectItem={props.selectItem}
                            setAdd={setAdd}
                            /> 
                        </div>  
                            <CTA name={"add"} type={"submit"}/> 
                        </div>
                </form>
    )
}