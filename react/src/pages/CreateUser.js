import React from 'react';
import { Link } from 'react-router-dom';
import UserForm from '../sections/UserForm';
import CTA from '../components/btns/CTA';
import Error from '../atoms/Error';
import Prompt from '../atoms/Prompt';
import useForm from '../hooks/upload/useForm';

 
export default function CreateUser() {
    const { values, handleChange, handleSubmit, error} = useForm({
        initialValues: {
            form: 'register',
            email: '',
            username: '',
            password: '', passwordConfirm: ''
        }
    }); 

    let invalidFields;
    error ? invalidFields = error.fields : invalidFields = []; 

    return(
            <div className="inlineForm">
            <h3>Register</h3>
                <div className="inlineForm__notif">
                    {error && <Error error={error.messages}/>}
                </div>
                <form onSubmit={handleSubmit}> 
                    <UserForm values={values} handleChange={handleChange} handleSubmit={handleSubmit}
                     invalidFields={invalidFields}/>
                <div className="inlineForm__submit">
                    <Link to='/login'>
                        <Prompt prompt={"Existing account? Log in."}/>
                    </Link>
                    <CTA name="register" kind="primary" type="submit"
                    /> 
                </div>
                </form>
            </div>
    )
}