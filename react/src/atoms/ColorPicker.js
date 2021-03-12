import React from 'react';

const ColorPicker = ({tag, eyedrop, handleColorSelect}) => {
    
    return (
        <input type="color" className="colorInput" data-id={tag._id} 
        defaultValue={tag.tagObject[0].color} 
        disabled={ eyedrop ? false : true}
        onBlur={(e) => handleColorSelect(e)}
        />
    );
}
 
export default ColorPicker;