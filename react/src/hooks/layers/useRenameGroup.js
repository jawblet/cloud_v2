import { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import slugify from 'react-slugify';
import { UserContext } from '../UserContext';

//rename a single group
export default function useRenameGroup(row) {
const { user, groups, setGroups } = useContext(UserContext); 
const house = user.house._id;
const [newName, setNewName] = useState(row.label);

const handleChange = (e) => {
    setNewName(e.currentTarget.value);
};

const rename = async (groups) => {
   return axios.put(`/houses/${house}`, { 
        groups
    }).then(res => {
        setGroups(groups);
    }).catch(err => console.log(err));
}

const handleBlur = async (e) => {
    const groupId = e.currentTarget.name;
    const newGroups = [...groups];
    let renamedGroup = groups[groupId];
    const newSlug = slugify(newName);
    renamedGroup = {...renamedGroup, 
                        label: newName,
                        slug: newSlug };
    newGroups.splice(groupId, 1, renamedGroup);
    await rename(newGroups);
}; 

    return {
        newName,
        handleChange,
        handleBlur
    }
}