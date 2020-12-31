import React, { useRef, useEffect, useState } from 'react'; 
import autosize from 'autosize';

export default function TextareaEdit(props) { 
    const { values,  
        handleClickIn, 
        handleBlur, 
        handleChange } = props;

    const descriptionRef = useRef(null);
    //const [placeholder, setPlaceholder] = useState(''); 


    useEffect(() => {
        autosize(descriptionRef.current);
    }, []);

    return(
            <textarea type="text" 
                ref={descriptionRef} 
                className="inlineEdit inlineText light"
                name="description"
                value={values.description}
                onClick={handleClickIn}
                onBlur={handleBlur}
                onChange={handleChange}
                rows={1}
                //onMouseEnter={() => setPlaceholder('Optional description')}
                //onMouseLeave={() => setPlaceholder('')} 
                //placeholder={placeholder}
            />
    )
}