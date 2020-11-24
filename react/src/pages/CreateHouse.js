import React, { useContext, useEffect } from 'react';
import FormInput from './../components/FormInput'; 
import CTA from './../components/CTA'; 
import Toggle from '../components/Toggle';
import useToggle from './../hooks/useToggle';
import Search from '../components/Search';
import Prompt from '../components/Prompt';
import TagBank from './../sections/TagBank';
import useForm from './../hooks/useForm';
import { UserContext } from './../hooks/UserContext';

//eventually, house rooms will be configurable here 
export default function CreateHouse() {
    const { user } = useContext(UserContext); 
    const { newState, handleToggle } = useToggle(false);
    const { handleChange, addEmails, handleSubmit, values, error, searchRef, clearInput, removeTag } = useForm({
        initialValues: {
            form: 'rent',
            house: '',
            emailInput: '',
            boarders: [user.email]
        }
    });

    useEffect(() =>{
        console.log(values.boarders);
    }, [addEmails])

    return(
        <div className="page" style={{justifyContent:'center'}}>
             <div className="inlineForm">
                <h3>Rent a house</h3>
                <div className="inlineForm__notif">
                </div>
                    <form className="formFields">
                        <FormInput type={"text"} placeholder={"House name"} 
                            name={"house"} values={values.house} handleChange={handleChange}/>
                        <Toggle handleToggle={handleToggle} toggleState={newState}
                                label="Add other boarders by email"/>
                            <div className={`inlineForm__toggle ${newState ? 'B' : 'A'}`}>
                                {newState 
                                    ? 
                                        <>
                                            <Search placeholder={"Enter up to 3 email addresses."} name={"emailInput"} 
                                            value={values.emailInput} handleChange={handleChange} addEmails={addEmails} 
                                            clearInput={clearInput} ref={searchRef} />  
                                            <TagBank tags={values.boarders} handleDelete={removeTag}/>
                                        </>
                                    :  <Prompt prompt="You won't be able to add boarders later." type="light"/>
                                }
                             </div>
                    <div className="inlineForm__submit" style={{justifyContent:'flex-end'}}>
                        <CTA name={"finish"} type={"submit"}
                        /> 
                    </div>
                </form>
             </div>
        </div>
    )
}