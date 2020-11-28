import React, { useRef } from 'react';
import Search from '../components/Search'; 
import TagBank from './TagBank';
import { CSSTransition } from 'react-transition-group';

export default function AddTags({tagInput, values, handleChange, addTags, clearInput, removeTag, searchRef}) {
    const nodeRef = useRef(null);
   console.log(values.input);
    return(
        <>
        <CSSTransition in={tagInput} timeout={700} nodeRef={nodeRef} classNames="rollDown" unmountOnExit>
       
        </CSSTransition>
        </>
    )
} 