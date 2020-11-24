import React from 'react';
import FormInput from './../components/FormInput'; 
import CTA from './../components/CTA'; 
import Toggle from '../components/Toggle';
import useToggle from './../hooks/useToggle';
import Search from '../components/Search';
import Prompt from '../components/Prompt';
import TagBank from './../sections/TagBank';
import useForm from './../hooks/useForm';

export default function CreateHouse() {
    //eventually, house rooms will be configurable here too
    const { newState, handleToggle } = useToggle(false);
    const { handleChange, handleSubmit, values, error, searchRef, addEmails, clearInput, removeTag } = useForm({
        initialValues: {
            form: 'rent',
            house: '',
            input: '',
            boardersUnconfirmed: []
        }
    });
 
    return(
             <div className="inlineForm">
                <h3>Rent a house</h3>
                <div className="inlineForm__notif">
                </div>
                    <form className="formFields" onSubmit={handleSubmit}>
                        <FormInput type={"text"} placeholder={"House name"} 
                            name={"house"} values={values.house} handleChange={handleChange}/>
                        <Toggle handleToggle={handleToggle} toggleState={newState}
                                label="Add other boarders by email"/>
                            <div className={`inlineForm__toggle ${newState ? 'B' : 'A'}`}>
                                {newState 
                                    ? 
                                        <>
                                            <Search placeholder={"Enter up to 3 email addresses."} name={"input"} 
                                            values={values.input} handleChange={handleChange} addEmails={addEmails} 
                                            clearInput={clearInput} ref={searchRef} />  
                                            <TagBank tags={values.boardersUnconfirmed} handleDelete={removeTag}/>
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
    )
}

