import React, { useRef, useEffect } from 'react';
import { VscClose, VscAdd } from 'react-icons/vsc';

export default function Search() {
    const searchRef = useRef(null);

    useEffect(() => { searchRef.current.focus(); }, []);

    return(
        <div className="search">
           <div className="search__icon">
                <VscClose className="icon icon__btn icon--small"/>
            </div>
            <input type="text" className="input search__bar" ref={searchRef}/>
            <div className="search__icon end">
                <VscAdd className="icon icon__btn icon--small"/>
            </div>
        </div>
    )
}