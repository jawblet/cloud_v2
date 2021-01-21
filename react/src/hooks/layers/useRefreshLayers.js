import { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';

export default function useGroupLayersById() {
    const { groups, setRooms } = useContext(UserContext);

    useEffect(() => { 
        const layerArrs = groups.map(el => {
            return el.layers
        });

        setRooms(layerArrs.flat());
    }, [groups]);
}