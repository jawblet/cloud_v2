import React from 'react';

export default function InputEdit(
    { style, 
    value,  
    size,
    handleClickIn, 
    handleBlur, 
    handleChange }) { 

    return(
            <input type="text"
                className="inlineEdit"
                name = "name"
                value = {value}
                disabled={false}
                size={size}
                style={style}
                onClick={handleClickIn}
                onBlur={handleBlur}
                onChange={handleChange}
            />
    )
}