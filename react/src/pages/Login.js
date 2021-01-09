import React from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import CTA from '../components/btns/CTA';
import Prompt from '../atoms/Prompt';
import Error from '../atoms/Error';
import useForm from '../hooks/upload/useForm';

export default function Login() {
 
    const { values, handleChange, handleSubmit, error} = useForm({
        initialValues: {
            form: 'login',
            username: '',
            password: ''
        }
    });

    let invalidFields;
    error ? invalidFields = error.fields : invalidFields = []; 
    console.log(error);
    console.log(invalidFields);

    return(
        <div className='page' style={{justifyContent:'center'}}>
             <div className="inlineForm">
                <h3>Login</h3>
             <div className="inlineForm__notif">
                 {error && <Error error={error.messages}/>}
             </div>
                <form onSubmit={handleSubmit} className="formFields">
                    <FormInput type={"text"} placeholder={"Username"} name={"username"} 
                                value={values.username} fail={invalidFields.includes("username")}
                                handleChange={handleChange} />
                    <FormInput type={"password"} placeholder={"Password"} name={"password"} 
                                value={values.password} fail={invalidFields.includes("password")}
                                handleChange={handleChange} />
                    <div className="inlineForm__submit">
                        <Link to='/register'>
                            <Prompt prompt={"No account? Create one."}/>
                        </Link>
                        <CTA name="login" kind="primary" type="submit"
                            /> 
                    </div>
                </form>
            </div>
        </div>
    )
}