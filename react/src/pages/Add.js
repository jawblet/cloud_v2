import React, { useContext } from 'react';
import Header from './../sections/Header';
import { UserContext } from './../hooks/UserContext';
import FormInput from './../components/FormInput';
import DropTextInput from './../components/DropTextInput';
import CTA from './../components/CTA'; 
import UploadContainer from '../components/upload/UploadContainer';
import useToggle from '../hooks/useToggle';


export default function Add() {
    const { user } = useContext(UserContext);
    const { handleToggle, newState } = useToggle(false); 

    //name, content upload (link/file/txt), comments, tags 

    return (
        <div className="page">
            <Header/>
            <div className="pageForm">
            <form>
                <div className="pageForm__field">
                <h4 className="pageForm__label">Name</h4>
                <FormInput type={"text"} name={"author"} 
                        value={user.username} disabled={true}/>
                </div>
                <UploadContainer/>

                <h4 onClick={handleToggle}>More?</h4>
                <DropTextInput show={newState}/> 
                <div className="inlineForm__submit" style={{justifyContent:'flex-end'}}>
                        <CTA name={"add"} type={"submit"}/> 
                </div>
            </form>
            </div>
        </div>
    )
}