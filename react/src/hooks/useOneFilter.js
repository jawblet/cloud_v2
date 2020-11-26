import { useState } from 'react'; 

export default function useRoomFilter(initialState) {
    //for list menu
    const [activeItem, setActiveItem ] = useState(initialState);

    const handleOneFilter = (e) => {
        setActiveItem(e.currentTarget.dataset.id);
    }

    return{
        handleOneFilter,
        activeItem
    }
}