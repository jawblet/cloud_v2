import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function useTags(activeItem) {
const { user, globalTags } = useContext(UserContext); 

const [loading, isLoading] = useState(true);
const [t_loading, is_t_Loading] = useState(true);
const [tags, setTags] = useState(null); // all tag objects
const [allTags, setAllTags] = useState(null);
const [tagCount, setTagCount] = useState({
    unique: '',
    sum: ''
})

useEffect(() => {
    let sort;
    switch(activeItem) {
        case 'recent': sort = 'date';
        break;
        case 'A - Z': sort = 'name';
        break;
        case 'count': sort = 'count';
        break;
        default: sort = 'date'; 
    }

axios.get(`/posts/tags/${user.house._id}/${sort}`)
    .then(res => {
        const tagData = res.data.data; 
        setTags(tagData.allTags);
        setTagCount({
            unique: tagData.allTags.length,
            sum: tagData.postTagSum
        })
        isLoading(false);
    }).catch((err) => { console.log(err) })
}, [activeItem]); // added user 


const getAllTagsFromPosts = () => {
    axios.get(`/posts/allTags/${user.house._id}/`) 
    .then(res => {
        const tagData = res.data.data; 
        setAllTags(tagData.allTagsFromPosts);
        is_t_Loading(false);
    }).catch((err) => { console.log(err) })
};

//change tag color 
    const [eyedrop, colorChangeActive] = useState(false);

    const handlePaintClick = () => {
        colorChangeActive(!eyedrop); 
    }

//last 3 tags
const [lastThreeTags, setLastTags] = useState(null);
useEffect(() => {
            try {
                axios({
                    method: 'GET',
                    url: `/tags/last3/${user.house._id}`
                }).then(res => {
                    setLastTags(res.data.data.results);
                })
            } catch(err) {
                console.log(err)
            }
}, [globalTags]) // added user 
   
    return {
        loading,
        t_loading,
        tags,
        tagCount,
        allTags,
        getAllTagsFromPosts,
        lastThreeTags,
        handlePaintClick,  
        eyedrop
    }
}