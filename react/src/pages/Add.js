import React, { useContext, useState } from 'react';
import Header from './../sections/Header';
import { UserContext } from './../hooks/UserContext';
import CTA from './../components/CTA'; 
import UploadContainer from '../components/upload/UploadContainer';
import useToggle from '../hooks/useToggle'; 
import { VscLink, VscSymbolParameter, VscArchive } from 'react-icons/vsc';
import useUpload from '../hooks/useUpload';


export default function Add() {
    const buttons = [
        {name: 'link', icon: <VscLink className="icon icon__btn" data-id="link"/>}, 
        {name: 'note', icon: <VscSymbolParameter className="icon icon__btn" data-id="note"/>},
        {name: 'file', icon: <VscArchive className="icon icon__btn" data-id="file"/>},
    ];

    const [type, setType]= useState('link');
    const switchType = (e) => { setType(e.target.dataset.id); }

    const { user } = useContext(UserContext);

    const { values, handleChange, handleSubmit, error} = useUpload({
        initialValues: {
            type: 'link',
            content: '',
            comment: '',
            author: user._id
        }
    });

    return (
        <div className="page">
            <Header/>
            <div className="pageForm">
            <form className="fullWidth" onSubmit={handleSubmit}>

                <UploadContainer buttons={buttons} type={type} switchType={switchType}
                                values={values} handleChange={handleChange} 
                />

                <div className="inlineForm__submit" style={{justifyContent:'flex-end', paddingTop:'3rem'}}>
                        <CTA name={"add"} type={"submit"}/> 
                </div>
            </form>
            </div>
        </div>
    )
}