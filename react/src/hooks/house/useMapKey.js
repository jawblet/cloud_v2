import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import * as zones from '../../data/zones';

export default function useMapKey(groupArray) {
    const { user, setGroups } = useContext(UserContext);
    const house = user.house._id;
    const [groups, setGroupState] = useState(null);

    useEffect(() => { 
        setGroupState(groupArray);
    }, [groupArray]); 

    const updateHouseModel = async (newRows) => {
        return axios.put(`/houses/${house}`, {
            groups: newRows   
        }).then(res => { 
            console.log(res);
            setGroups(newRows);
        }).catch(err => console.log(err));    
    }

    const changeColor = (layer, zone) => {
        console.log(zone);
        const zoneArray = zones[zone];
        console.log(zoneArray);
        const max = zoneArray.length; 
        const num = Math.floor(Math.random() * Math.floor(max));
        const color = zoneArray[num];
        layer.color = color;
        console.log(color);
        return layer;
    }

    const reorderList = (list, startIndex, endIndex) => {
        const [item] = list.splice(startIndex, 1);
        list.splice(endIndex, 0, item);
        return list; 
    } 
    
//droppableId = col id 
//index = item position 

    const reorderRows = (groups, source, destination) => {
        const dragGroup = groups.find(x => x.id === source.droppableId);
        const dropGroup = groups.find(x => x.id === destination.droppableId);
        let newGroups;
  
        // moving to same list
        if (source.droppableId === destination.droppableId) {
            const reordered = reorderList(dragGroup.layers, source.index, destination.index); 
            newGroups = groups.map(x => (x.id === dropGroup.id ? {...x, layers: reordered } : x));
            return updateHouseModel(newGroups);
        }
       
        // moving to different lists -- merge object? 
            let target = dragGroup.layers[source.index];
            let newTarget = changeColor(target, dropGroup.zone);
            dragGroup.layers.splice(source.index, 1); //remove item from drag row
            dropGroup.layers.splice(destination.index, 0, newTarget); // add item to drop row
            newGroups = groups.map(group => {
                if(source.droppableId === group.id) {
                    return dragGroup;
                } else if (destination.droppableId  === group.id) {
                    return dropGroup;
                }
                return group;
            })
            updateHouseModel(newGroups);
    };
    

    const addRow = (rows) => {
        const ungrouped = groups[groups.length - 1]; //ungrouped object 
        groups.splice((groups.length - 1), 1);
        const newGroup = {
                        id: `${groups.length}`,
                        label: `Group ${groups.length + 1}`,
                        slug: `group-${groups.length + 1}`,
                        zone: "clay", //DEFAULT ZONE GOES HERE 
                        layers: []
                }
        const newGroups = [...groups, newGroup, ungrouped];
        updateHouseModel(newGroups);
    };
    
    const deleteRow = async (group) => {
        let newGroups; 
        let groupsRemaining = groups.filter(el => el.id !== group.id);
        if(group.layers.length) { //redistribute layers if they exist
            const ungrouped = groups[groups.length - 1].layers;  //get ungrouped layers 
            const newUngrouped = [...ungrouped, ...group.layers]; //move row's layers to ungrouped layers     
                newGroups = groupsRemaining.map(x => {
                    if(x.id === "ungrouped") {
                        return {
                            ...x,
                            layers: newUngrouped
                        }
                    } return x
                });
            } else {
                 newGroups = groupsRemaining;
            }
       await updateHouseModel(newGroups);
    }

    return {
        groups,
        reorderRows,
        addRow,
        deleteRow
    }
}