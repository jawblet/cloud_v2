import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function useGroupPosts() {
    const { user } = useContext(UserContext);
    const house = user.house._id; 
    const [group, setGroup] = useState(null);
    const [loading, setGroupLoading] = useState(null);

    const getGroup = async(groupSlug) => {
        await axios.get(`/houses/${house}`)
        .then(res => {
            const groups = res.data.data.doc.groups;
            const currentGroup = groups.find(el => el.slug === groupSlug);
            setGroup(currentGroup);
            setGroupLoading(false);
    }).catch(err => console.log(err));     
    }

    return {
        getGroup,
        group
    }
}