import React from 'react';
import { VscClose } from 'react-icons/vsc';

export default function DeleteGroup({ group, deleteRow }) { 
    return(
        <button className="group__delete">
        {(group.id !== "ungrouped") &&  
                <VscClose 
                   onClick={() => deleteRow(group)}
                    />}
        </button>
    )
}