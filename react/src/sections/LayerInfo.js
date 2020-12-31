import React from 'react';
import TextareaEdit from '../components/TextareaEdit';
import InputEdit from '../components/InputEdit';
import useRenameLayer from '../hooks/layers/useRenameLayer';
import { VscTrash } from 'react-icons/vsc';

export default function LayerInfo(props) {

    const { style, 
        values,  
        size, 
        handleClickIn, 
        handleBlur, 
        handleChange,
        } = useRenameLayer(props);

    return (
        <div className="page__info">
            <div className="page__title"> 
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
            <VscTrash className="icon icon__btn icon--warning" onClick={props.toggleModal}/>
        </div>
    )
}

