import React, { useRef, useEffect } from 'react'; 
import autosize from 'autosize';

export default function TextareaEdit(
    { value,  
    handleClickIn, 
    handleBlur, 
    handleChange }) { 

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
                value={value}
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