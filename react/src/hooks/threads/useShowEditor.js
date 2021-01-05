import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useShowEditor() {
    let location = useLocation();

    const [showEdit, setEditor] = useState(null);

    useEffect(() => {
        if(location.hash === '#new') {
           return setEditor(true);
        }
        return setEditor(false);
    }, []);

    return {
        showEdit,
        setEditor,
    }
}