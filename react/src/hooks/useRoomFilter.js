import { useState } from 'react'; 

export default function useRoomFilter() {
    const list = ['date', 'tag', 'boarder'];
    const [activeItem, setActiveItem ] = useState('date');

    const handleListSelect = (e) => {
        setActiveItem(e.currentTarget.dataset.id);
    }

    return{
        list,
        handleListSelect,
        activeItem
    }
}