import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function useChangeColor() {
    const { globalTags, setGlobalTags } = useContext(UserContext);
    //change tag color 
    const [eyedrop, colorChangeActive] = useState(false);

    const handlePaintClick = () => {
        colorChangeActive(!eyedrop); 
    }

    async function changeColor(color, id) {
        return axios.put(`/tags/${id}`, 
            { color })
            .then(res => {
                console.log(res.data.data.doc); 
                const newTag = res.data.data.doc;
                const remainingTags = globalTags.filter(el => el._id !== newTag._id);
                setGlobalTags([...remainingTags, newTag]);
            }).catch(err => console.log(err));
    }

    const handleColorSelect = async (e) => {
        console.log(e.target.value);
        const color = e.target.value;
        const id = e.target.dataset.id;
        await changeColor(color, id);
    }
    
    return {
        handlePaintClick,
        handleColorSelect,
        eyedrop
    }
}