import React from 'react';
import CTA from '../../btns/CTA'

const AddLayer = ({ handleClick }) => {
    return (
       <CTA name="+ add group" kind="ghost" handleClick={handleClick}/>
    );
}
 
export default AddLayer;