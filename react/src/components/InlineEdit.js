import React from 'react';
import useRenameRoom from '../hooks/useRenameRoom';

export default function InlineEdit(props) {
    const {name, id} = props; 

    const {style, 
            editValue, 
            size,
            handleClickIn, 
            handleClickOut, 
            handleChange} = useRenameRoom(name, id);

    return(
            <input type="text"
                className="inlineEdit"
                value = {editValue}
                disabled={false}
                size={size}
                style={style.textStyle}
                onClick={handleClickIn}
                onBlur={handleClickOut}
                onChange={handleChange}
            />
    )
}