import React from 'react';
import TextareaEdit from '../components/TextareaEdit';
import InputEdit from '../components/InputEdit';
import useRenameRoom from '../hooks/useRenameRoom';

export default function RoomInfo(props) {

    const { style, 
        values,  
        size, 
        handleClickIn, 
        handleBlur, 
        handleChange,
        } = useRenameRoom(props);



    return (
        <div className="page__title"
        >
            <InputEdit  style={style} 
                        values={values}   
                        size={size} 
                        handleClickIn={handleClickIn}  
                        handleBlur={handleBlur} 
                        handleChange={handleChange} />
            <TextareaEdit values={values}   
                        handleClickIn={handleClickIn}  
                        handleBlur={handleBlur} 
                        handleChange={handleChange}
                        />
        </div>
    )
}

