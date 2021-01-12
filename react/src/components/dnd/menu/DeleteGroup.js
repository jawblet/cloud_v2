import React from 'react';
import { VscClose } from 'react-icons/vsc';

export default function DeleteGroup({ row, deleteRow }) { 
    return(
        <button className="group__delete">
        {(row.id !== "ungrouped") &&  
                <VscClose 
                    onClick={() => deleteRow(row)}
                    />}
        </button>
    )
}