import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export default function useTags(activeItem) {
const { user } = useContext(UserContext); 

//get global tags for context 
const [globalTags, setGlobalTags] = useState(null);
const [loading, isLoading] = useState(true);

//get all tags by house + add sort ability 
const [tags, setTags] = useState(null);
const [tagTotal, countTagTotal] = useState(null);


//set global tags 
useEffect(() => {
    try {
        axios({
            method: 'GET',
            url: `/tags/h/${user.house._id}` 
        }).then(res => {
            setGlobalTags(res.data.data.results);
            isLoading(false);
        })
    } catch(err) {
        console.log(err)

    }
}, [])

useEffect(() => { 
    let sort;
    switch(activeItem) {
        case 'recent': sort = 'h';
        break;
        case 'A - Z': sort = 'AtoZ';
        break;
        default: sort = 'h'; 
    }
    try {
        axios({
            method: 'GET',
            url: `/tags/${sort}/${user.house._id}` 
        }).then(res => {
            // console.log(res.data.data.results);
            setTags(res.data.data.results);
            countTagTotal(res.data.data.results.length);
        })
    } catch(err) {
        console.log(err)
    }
}, [activeItem]);

//change tag view 
    const [tagView, setTagView] = useState('gradient');

//change tag color 
    const [eyedrop, colorChangeActive] = useState(false);
    const [colorPicker, setOpenColorPicker] = useState([]);

    const handlePaintClick = () => {
        colorChangeActive(!eyedrop);
    }

//alphabetize tags
    const alphabetizeTags = () => {
        try {
            axios({
                method: 'GET',
                url: `/tags/AtoZ/${user.house._id}`
            }).then(res => {
               // console.log(res.data.data.results);
                setTags(res.data.data.results);
            })
        } catch(err) {
            console.log(err)
        }
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
        globalTags,
        loading,
        alphabetizeTags,
        tags,
        tagTotal,
        tagView,
        lastThreeTags,
        handlePaintClick,  
        eyedrop
    }
}