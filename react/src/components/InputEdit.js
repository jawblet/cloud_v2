import React from 'react';

export default function InputEdit(props) { 
    const {style, 
        values,  
        size,
        handleClickIn, 
        handleBlur, 
        handleChange} = props;

    return(
            <input type="text"
                className="inlineEdit"
                name = "name"
                value = {values.name}
                disabled={false}
                size={size}
                style={style.textStyle}
                onClick={handleClickIn}
                onBlur={handleBlur}
                onChange={handleChange}
            />
    )
}