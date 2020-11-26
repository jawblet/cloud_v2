import React, { useRef } from 'react';
import Search from '../components/Search'; 
import TagBank from './TagBank';
import { CSSTransition } from 'react-transition-group';

export default function AddTags({tagInput, values, handleChange, addTags, clearInput, removeTag, searchRef}) {
    const nodeRef = useRef(null);
    return(
        <>
        <CSSTransition in={tagInput} timeout={700} nodeRef={nodeRef} classNames="rollDown" unmountOnExit>
            <div className="addTags" ref={nodeRef}>
                <Search name={"input"} values={values.input} ref={searchRef}
                        handleChange={handleChange} addTags={addTags} clearInput={clearInput}/>
                <span style={{width: '100%', paddingTop:'1.5rem'}}>
                    <TagBank tags={values.tags} handleDelete={removeTag}/>
                </span>
            </div>
        </CSSTransition>
        </>
    )
} 