import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export default function useTags(activeItem) {
const { user } = useContext(UserContext); 

const [t_loading, isLoading] = useState(true);
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
        //isLoading(false);
    }).catch((err) => { console.log(err) })
}, [activeItem]);


const getAllTagsFromPosts = () => {
    axios.get(`/posts/allTags/${user.house._id}/`)
    .then(res => {
        const tagData = res.data.data; 
        setAllTags(tagData.allTagsFromPosts);
        isLoading(false);
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
                    //console.log(res.data.data.results);
                    setLastTags(res.data.data.results);
                })
            } catch(err) {
                console.log(err)
            }
    }, [])
   
    return {
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