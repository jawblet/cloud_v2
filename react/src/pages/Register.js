import React from 'react';
import { Link } from 'react-router-dom';
import FormInput from './../components/FormInput';
import CTA from './../components/CTA';
import Prompt from './../components/Prompt';
import ConfirmPasswordInput from './../components/ConfirmPasswordInput';
import Error from './../components/Error';
import useForm from './../hooks/useForm';

export default function Register() {

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
        <div className="page" style={{justifyContent:'center'}}>
            <div className="inlineForm">
            <h3>Register</h3>
                <div className="inlineForm__notif">
                    {error && <Error error={error.messages}/>}
                </div>
                    <form onSubmit={handleSubmit}>
                        <FormInput type={"text"} placeholder={"Email"} 
                                    name={"email"} value={values.email} 
                                    fail={invalidFields.includes("email")}
                                    handleChange={handleChange} />

                        <FormInput type={"text"} placeholder={"Username"} 
                                    name={"username"} value={values.username} 
                                    fail={invalidFields.includes("username")}
                                    handleChange={handleChange} />

                        <ConfirmPasswordInput type={"password"} 
                                    fail={invalidFields.some(el => el === "password" || "passwordConfirm")}
                                    placeholder={"Password"} placeholderConfirm={"Confirm password"}
                                    name={"password"} nameConfirm={"passwordConfirm"}
                                    value={values.password} valueConfirm={values.passwordConfirm}
                                    handleChange={handleChange}/>

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