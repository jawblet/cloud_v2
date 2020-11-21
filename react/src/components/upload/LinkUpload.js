import React, { useContext } from 'react';
import FormInput from '../FormInput';
import { UserContext } from './../../hooks/UserContext';
import useUpload from './../../hooks/useUpload';

export default function LinkUpload(props) {
    const { values, handleChange } = props;

    console.log(values);

    return(
        <>
            <FormInput type="url" placeholder="📎" white={true} name="content"
                       value={values.content} handleChange={handleChange}
            /> 
        </>
    )
}