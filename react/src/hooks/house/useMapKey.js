import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function useMapKey(groups) {
    const { user, setGroups } = useContext(UserContext);
    const house = user.house._id;
    const [rows, setRows] = useState(null);

    useEffect(() => {
        setRows(groups);
    }, [groups])

    const updateHouseModel = (newRows) => {
        axios.put(`/houses/${house}`, {
            groups: newRows   
        }).then(res => { 
            setRows(newRows);
            setGroups(newRows);
        }).catch(err => console.log(err));
    }

    const reorderList = (list, startIndex, endIndex) => {
        const [item] = list.splice(startIndex, 1);
        list.splice(endIndex, 0, item);
        return list;
    }
    
    const reorderRows = (rows, source, destination) => {
        const dragRow = rows.find(x => x.id === source.droppableId);
        const dropRow = rows.find(x => x.id === destination.droppableId);
        const target = dragRow.layers[source.index];
        let newRows;
    
        // moving to same list
        if (source.droppableId === destination.droppableId) {
            const reordered = reorderList(dragRow.layers, source.index, destination.index); 
            newRows = rows.map(x => (x.id === dropRow.id ? {...x, layers: reordered } : x));
            console.log(newRows);
            return updateHouseModel(newRows);
        }
    
        // moving to different lists
            dragRow.layers.splice(source.index, 1); //remove item from drag row
            dropRow.layers.splice(destination.index, 0, target); // add item to drop row
            newRows = rows.map(x => {
                if(dragRow.id === x.id) {
                    return {
                        ...x, 
                        layers: dragRow.layers
                    }
                } else if (dropRow.id === x.id) {
                    return {
                        ...x,
                        layers: dropRow.layers
                    };
                }
                return x;
            })
            console.log(newRows);
            updateHouseModel(newRows);
    };
    
    const addRow = (rows) => {
        const ungrouped = rows[rows.length - 1];
        rows.splice((rows.length - 1), 1);
        const newGroup = {
                        id: `${rows.length}`,
                        label: `Group ${rows.length + 1}`,
                        slug: `group-${rows.length + 1}`,
                        layers: []
                }
        const newRows = [...rows, newGroup, ungrouped];
        updateHouseModel(newRows);
    };
    
    const deleteRow = (row) => {
        let newRows;
        let rowsRemaining = rows.filter(x => x.id !== row.id);
        if(row.layers.length) { //redistribute layers if they exist
            const ungrouped = rows[rows.length - 1].layers;  //get ungrouped layers 
            const newUngrouped = [...ungrouped, ...row.layers]; //move row's layers to ungrouped layers     
                newRows = rowsRemaining.map(x => {
                    if(x.id === "ungrouped") {
                        return {
                            ...x,
                            layers: newUngrouped
                        }
                    } return x
                });
            } else {
                 newRows = rowsRemaining;
            }
        updateHouseModel(newRows);
    }

    return {
        rows,
        setRows,
        reorderRows,
        addRow,
        deleteRow
    }
}