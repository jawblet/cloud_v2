import React from 'react'; 
import CTA from '../components/btns/CTA';
import UserForm from '../sections/UserForm';
import FormInput from '../components/FormInput';
import Prompt from '../atoms/Prompt';
import Error from '../atoms/Error'; 
import useConfirm from '../hooks/user/useConfirm';

export default function Confirm() {
    const {values, handleChange, handleCheckHouse, error } = useConfirm({
        initialValues: {
            email: '',
            username: '',
            password: '', passwordConfirm: '',
            house: ''
        }
    });

    let invalidFields;
    error ? invalidFields = error.fields : invalidFields = []; 

    const sendSubmit = (e) => {
        e.preventDefault();
        handleCheckHouse({ values });
    }

    return(
        <div className="page" style={{justifyContent:'center'}}>
            <div className="inlineForm">
                <h3>Confirm</h3>
                    <div className="inlineForm__notif">
                        {error 
                            ? <Error error={error.messages}/>
                            :  <p> 
                                To join the house, register with <br/> the email address you used to open this link. 
                            </p> }
                    </div>
                <form onSubmit={sendSubmit}>
                <UserForm values={values} handleChange={handleChange}
                invalidFields={invalidFields}/>
                <div className="flex justifyStart padBottomOne">
                    <Prompt prompt={"Enter the house name in the email."} type="light"/>
                </div>
                <FormInput type={"text"} placeholder={"House"} name={"house"} value={values.house} 
                fail={invalidFields.includes("house")}
                handleChange={handleChange}/>
                    <div className="inlineForm__submit" style={{justifyContent:'flex-end'}}>
                        <CTA name="register" kind="primary" type={"submit"}/>
                    </div>
                </form>
            </div>
        </div>
    )
}