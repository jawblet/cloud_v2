import React, { useState } from 'react';
import TagBank from './../sections/TagBank';
import FormInput from '../components/FormInput'; 
import CTA from '../components/btns/CTA'; 
import Toggle from '../components/Toggle';
import Search from '../components/Search';
import Prompt from '../atoms/Prompt';
import Error from '../atoms/Error';
import useForm from '../hooks/upload/useForm';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
 
export default function CreateHouse() {

    //eventually, house rooms will be configurable here too
    const [boarders, openBoarders] = useState(false);
    const { handleChange, handleSubmit, values, error,
         searchRef, addTags, clearInput, 
         removeTag, handleKeyDown } = useForm({
        initialValues: {
            form: 'rent',
            house: '',
            input: '',
            boardersUnconfirmed: []
        }
    });
 
    return (
             <div className="inlineForm">
                <h3>Rent a house</h3>
                <div className="inlineForm__notif">
                    {error && <Error error={error.messages}/>}
                </div>
                    <form className="formFields" onSubmit={handleSubmit}>
                        <FormInput type={"text"} placeholder={"House name"} 
                            name={"house"} values={values.house} handleChange={handleChange}/>
                        <Toggle handleToggle={() => openBoarders(!boarders)} toggleState={boarders} 
                                label="Add other boarders by email" />
                        <SwitchTransition mode="out-in">
                            <CSSTransition key={boarders} 
                                timeout={350} 
                                classNames="rollDownFadeOut" 
                                addEndListener={(node, done) => {
                                        node.addEventListener("transitionend", done, false);
                            }}> 
                                 {!boarders 
                                    ? <Prompt prompt="You won't be able to add boarders later." type="light"/> 
                                    :
                                <div className="addBoarders"> 
                                        <Search placeholder={"Enter up to 3 email addresses."} name={"input"} 
                                                values={values.input} handleChange={handleChange} addTags={addTags} 
                                                clearInput={clearInput} ref={searchRef} handleKeyDown={handleKeyDown}/>  
                                        <TagBank tags={values.boardersUnconfirmed} handleDelete={removeTag}/>
                                    </div>   }
                            </CSSTransition>
                        </SwitchTransition>
                    <div className="inlineForm__submit" style={{justifyContent:'flex-end'}}>
                        <CTA name="finish" kind="primary" type="submit"
                        /> 
                    </div>
                </form>
             </div>
    )
}
