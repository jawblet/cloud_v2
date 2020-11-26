import { useState } from 'react';

export default function useManyFilters(initialState) {
    const [activeFilter, changeFilter] = useState(initialState);

    const handleFilterClick = (e) => {
        const currentState = [...activeFilter];
        const newFilter = e.target.dataset.id;
        let c; 
        //check if activeFilter contains newFilter
        if(currentState.includes(newFilter)) { 
            //if activeFilter contains newFilter, remove it
           c = currentState.filter(el => el !== newFilter);
        } else {
            //if activeFilter doesn't contain newFilter, add it  
            c = currentState.concat(e.target.dataset.id);
        }
        changeFilter(c);
    }

    return {
        activeFilter, 
        handleFilterClick
    }
}