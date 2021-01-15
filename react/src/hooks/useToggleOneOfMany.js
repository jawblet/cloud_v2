import  { useState, useEffect, useRef } from 'react';
 
export default function useToggleOne(props) {
    const toggleRef = useRef(null);
    const [menu, setMenu] = useState([]);

    const revertAll = () => {
        const initState = props.map(obj => false);
        setMenu(initState); 
    }

    //set init state on an array of children 
    useEffect(() => {
        revertAll();
    }, [props]);

    
    const toggleMenu = (e) => {
        const i = e.currentTarget.dataset.id;
        const newArr = [...menu];
        newArr[i] = !newArr[i]; 
        setMenu(newArr);
    }

    const handleClickOutside = event => {
        if (toggleRef.current && !toggleRef.current.contains(event.target)) {
          revertAll();
        }
      };
    
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
          document.removeEventListener("click", handleClickOutside, true);
        };
      });

    return {
        revertAll,
        toggleMenu,
        toggleRef, 
        menu
    }
}