import React, { useRef } from 'react';
import Search from './../components/Search';
import { CSSTransition } from 'react-transition-group';


export default function AddTags({ tags }) {
    const nodeRef = useRef(null);

    return(
        <>
        <CSSTransition in={tags} timeout={700} nodeRef={nodeRef} classNames="rollDown" unmountOnExit>
            <div className="addTags" ref={nodeRef}>
                <Search/>
               {/* <h4 className="addTags__recent"> Recent tags: </h4> */}
            </div>
        </CSSTransition>
        </>
    )
}