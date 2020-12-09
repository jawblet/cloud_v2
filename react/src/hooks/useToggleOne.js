import  { useState, useEffect, useRef } from 'react';

export default function useToggleOne(props) {
    const toggleRef = useRef(null);
    const [menu, setMenu] = useState([]);

    //set init state on an array of children 
    useEffect(() => {
        const initState = props.map(obj => false);
        setMenu(initState); 
    }, [props]);
    
    const toggleMenu = (e) => {
        const i = e.currentTarget.dataset.id;
        const newArr = [...menu];
        newArr[i] = !newArr[i]; 
        setMenu(newArr);
    }

    return {
        toggleMenu,
        toggleRef, 
        menu
    }
}