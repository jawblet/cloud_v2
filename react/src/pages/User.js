import React, { useContext } from 'react';  
import { UserContext } from '../hooks/UserContext';
import UserForm from '../sections/UserForm';
import Error from '../atoms/Error';
import Notification from '../atoms/Notification';
import CTA from '../components/btns/CTA'; 
import Header from '../sections/Header';
import Prompt from '../atoms/Prompt';
import UserModal from '../components/modals/UserModal';
import useModal from '../hooks/useModal'; 
import useForm from '../hooks/upload/useForm';
import useDelete from '../hooks/user/useDelete'; 

export default function User() {
    const { user } = useContext(UserContext);
    const { modal, toggleModal, handleOutsideClick, modalRef } = useModal();
    const { deleteUser } = useDelete(user._id);

    //submit for user form changes user data 
    const { values, handleChange, handleSubmit, error, success } = useForm({
        initialValues: {
            form: 'user',
            email: user.email,
            username: user.username,
            password: '', passwordConfirm: ''
        }
    });
    //set invalid fields if error exists 
    let invalidFields;
    error ? invalidFields = error.fields : invalidFields = []; 

    // only show success if there are no errors
    const notif = (error == null) && (success !== null); 

    return(
        <div className="page" >
            <Header/> 
            <div className="inlineForm">
                <h3 style={{marginBottom:'1rem'}}>@{user.username}</h3>
                <div className="inlineForm__notif">
                    {error && <Error error={error.messages}/>}
                    {notif && <Notification notif={success}/>}
                </div>
                <div className="flex justifyStart" style={{padding:'1rem 0'}}>
                    <Prompt prompt={"Edit your account information"}/>
                </div>
                <form onSubmit={handleSubmit}>
                <UserForm values={values} handleChange={handleChange} handleSubmit={handleSubmit}
                        user={user} invalidFields={invalidFields}/>
                    <div className="inlineForm__submit padBottomThree" style={{justifyContent:'flex-end'}}>
                        <CTA name={"save"} type={"submit"}/> 
                    </div>
                </form>
                <div className="flex justifyEnd pointer">
                <Prompt prompt="Delete account" type="light" handleClick={() => toggleModal()}/>
            </div>
            </div>
            {modal &&  
            <UserModal toggleModal={toggleModal} handleOutsideClick={handleOutsideClick} 
                    ref={modalRef} deleteUser={deleteUser}/> }
        </div>
    )
}