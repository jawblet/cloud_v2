import React from 'react'; 
import UserForm from './../sections/UserForm';
import Error from './../components/Error';
import useForm from './../hooks/useForm';
import { Link } from 'react-router-dom';
import CTA from './../components/CTA'; 
import Prompt from './../components/Prompt';
 
export default function Register() {

    const { values, handleChange, handleSubmit, error} = useForm({
        initialValues: {
            form: 'register',
            email: '',
            username: '',
            password: '', passwordConfirm: ''
        }
    });
 
    let user = {};

    let invalidFields;
    error ? invalidFields = error.fields : invalidFields = []; 

    return(
        <div className="page" style={{justifyContent:'center'}}>
            <div className="inlineForm">
            <h3>Register</h3>
                <div className="inlineForm__notif">
                {error && <Error error={error.messages}/>}
                </div>
                <form onSubmit={handleSubmit}>
                    <UserForm values={values} handleChange={handleChange} handleSubmit={handleSubmit}
                    user={user} invalidFields={invalidFields}/>
                <div className="inlineForm__submit">
                    <Link to='/login'>
                        <Prompt prompt={"Existing account? Log in."}/>
                    </Link>
                    <CTA name={"register"} type={"submit"}
                    /> 
                </div>
                </form>
            </div>
        </div>
    )
}