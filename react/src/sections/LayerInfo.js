import React from 'react';
import TextareaEdit from '../components/TextareaEdit';
import InputEdit from '../components/InputEdit';
import useRenameLayer from '../hooks/layers/useRenameLayer';
import { VscTrash } from 'react-icons/vsc';
import { PAGE_TITLE } from '../pages/layer/layer_data';

export default function LayerInfo(props) {
 
    const {
        values,  
        size, 
        handleClickIn, 
        handleBlur, 
        handleChange
        } = useRenameLayer(props); 

    return (
        <div className="page__info">
            <div className="page__title"> 
                <InputEdit  style={PAGE_TITLE}
                            value={values.name}   
                            size={size} 
                            handleClickIn={handleClickIn}  
                            handleBlur={handleBlur} 
                            handleChange={handleChange} /> 
                <TextareaEdit value={values.description}   
                            handleClickIn={handleClickIn}  
                            handleBlur={handleBlur} 
                            handleChange={handleChange}
                            />
            </div>
            <div className="page__delete">
                <VscTrash className="icon icon__btn icon--warning" 
                            onClick={props.toggleModal}/>
            </div>
        </div>
    )
}

