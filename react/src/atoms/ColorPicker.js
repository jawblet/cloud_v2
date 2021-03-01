import React from 'react';

const ColorPicker = ({tag, eyedrop}) => {
    return (
        <input type="color" className="colorInput" data-id={tag.id} 
        defaultValue={tag.tagObject[0].color} 
        disabled={eyedrop ? false : true}/>
    );
}
 
export default ColorPicker;