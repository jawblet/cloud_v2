import React from 'react';
import FormInput from '../FormInput';

export default function LinkUpload(props) {
    const { values, handleChange } = props;

    return( 
        <div className="upload upload--link">
            <FormInput type="url" placeholder="📎" white={true} name="content"
                       value={values.content} handleChange={handleChange}/> 
        </div>
    )
}