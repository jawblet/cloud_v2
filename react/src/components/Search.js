import React, { forwardRef, useState } from 'react';
import { VscClose, VscAdd } from 'react-icons/vsc';

const Search = forwardRef((props, ref) => { 
    const { input } = props.values;
    
    const [focus, setFocus] = useState(false);
    
    const handleFocus = () => {  
        setFocus(true); 
    };

    return(
        <div className="searchContainer">
            <div className="search">
            {focus && <div className="search__icon">
                    <VscClose className="icon icon__btn icon--small" onClick={props.clearInput}/>
                </div> }
                    <input type="text" name="input" value={input} className="input search__bar" ref={ref} 
                    placeholder={props.placeholder} 
                    onChange={props.handleChange} onKeyDown={props.handleKeyDown}
                    onFocus={handleFocus}
                    /> 
                {focus && <div className="search__icon--end" onClick={props.addTags}>
                    <VscAdd className="icon icon__btn icon--small"/>
                </div>}
            </div>
        </div>
    )
}); 

export default Search;