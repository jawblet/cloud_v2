import { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';

export default function useGroupLayersById() {
    const { groups, setRooms } = useContext(UserContext);

    useEffect(() => { 
        console.log('ok')
        const layerArrs = groups.map(el => {
            return el.layers
        });
        setRooms(layerArrs.flat());
    }, [groups])
    
}