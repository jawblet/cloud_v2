import React from 'react';
import { Link } from 'react-router-dom';
import FormInput from './../components/FormInput';
import CTA from './../components/CTA';
import Prompt from './../components/Prompt';
import Error from './../components/Error';

export default function Login() {
    return(
        <div className='page' style={{justifyContent:'center'}}>
             <div className="inlineForm">
             <h3>Login</h3>
             <div className="inlineForm__notif">
             </div>
             <FormInput type={"email"} placeholder={"Email"} name={"email"} 
                            //value={values.email} fail={invalidFields.includes("email")}
                           // handleChange={handleChange} handleKeyDown={handleKeyDown} 
                            />
            <FormInput type={"email"} placeholder={"Email"} name={"email"} 
                            //value={values.email} fail={invalidFields.includes("email")}
                           // handleChange={handleChange} handleKeyDown={handleKeyDown} 
                            />
            <div className="inlineForm__submit">
                <Link to='/register'>
                    <Prompt prompt={"No account? Create one."}/>
                </Link>
                <CTA name={"login"} type={"submit"} 
                        //handleClick={(e) => handleSubmit(e)}
                    /> 
            </div>

            </div>
        </div>
    )
}