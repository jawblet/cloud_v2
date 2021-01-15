import { useEffect, useRef, useState } from 'react';

export default function useDetectClickOut(initState) {
    const [disable, setDisable] = useState(initState); 
    const nodeRef = useRef(null);

    const handleClickOutside = event => {
        if (nodeRef.current && !nodeRef.current.contains(event.target)) {
          setDisable(true);
        }
      };
    
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
          document.removeEventListener("click", handleClickOutside, true);
        };
      });
    
    return {
        nodeRef,
        disable,
        setDisable
    }
}