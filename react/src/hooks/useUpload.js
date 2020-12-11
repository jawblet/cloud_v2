import React, { useState, useContext } from 'react';   
import axios from 'axios'; 
import { UserContext } from './UserContext';
import { colors } from './colors';
  
export default function useUpload({ initialValues }) {
    const colorArr = colors;
    const { user, globalTags, setGlobalTags } = useContext(UserContext); 
    const [values, setValues] = useState(initialValues || {}); 
    const [results, setResults] = useState([]);
    const tags = globalTags;
 
//define ref for searchbar 
const searchRef = React.createRef(); 
 
//track form values
    const handleChange = (event) => {
        const value = event.target.value; 
        const name = event.target.name;
            setValues({
                ...values, 
                [name]: value
            }); 

        if(searchRef.current) { //search in tag input 
            console.log(searchRef.current.value);
            try {
                axios({
                    method: 'GET',
                    url: `search/${user.house._id}?search=${value}`
                }).then(res => {
                    const returnObj = res.data.data.results; 
                    setResults(returnObj);
                })
            } catch(err) { console.error(err); }
        }
    };

//handle key down events in tag upload
const handleKeyDown = (e) => {
    if(searchRef.current) {
       //submit tags on comma or enter press
        if(e.keyCode == 188 || e.keyCode == 13) {
            e.preventDefault();
            addTags();
        }
    }
};

//handle room selection 
    const selectItem = e => {
        setValues({
            ...values,
            room: e.currentTarget.dataset.id
        }); 
    }

//add tags to state and post them 
    const addTags = async () => {
        if(values.input) { //check if tag exists 
            const trimmedTag = values.input.trim(); //trim whitespace 
            const n = Math.floor(Math.random() * Math.floor(colorArr.length));
            let color = colorArr[n];
            try {
                await axios({
                    method: 'POST',
                    url: 'tags',
                    data: {
                        tag: trimmedTag,
                        house: user.house,
                        user: user._id,
                        color
                    } 
                }).then(res => {
                    if (res.status === 200) {
                        console.log(res.data.data.checkTag[0]._id);
                        return setValues({ ...values,
                            error: 'This house already has that tag.'
                        }); 
                    }
                    const newTag = res.data.data.tag;
                    setValues({ ...values,
                        tags: [...values.tags, newTag],
                        error: null,
                        input: ''
                    }); 
                    setGlobalTags([...tags, newTag]); //add new tag to global scope
                });
            } catch(err) {
                console.log(err);
            }
        } else {
            return console.log('not a tag');
        }
    }; 

//select existing tag from autocomplete or recents
    const selectTag = (e) => {
        const tagId = e.currentTarget.dataset.id;
        const tagArr = values.tags.map(el => el._id);
        
        if(tagArr.includes(tagId)) {
             return setValues({ ...values,
                error: 'Don\'t add duplicate tags'
            }); 
        }

        axios.get(`tags/${tagId}`).then(res => {
            const newTag = res.data.data.doc;
            setValues({ ...values,
                    tags: [...values.tags, newTag],
                    error: null,
                    input: ''
            }); 
        });
    }

//clear input
    const clearInput = () => {
       setValues({
        ...values,
        input: ''
    });
}

//delete tag from post 
    const removeTag = (tag) => {
        let newTags = values.tags.filter(el => el !== tag);
        setValues({
            ...values,
            tags: newTags
        });
     };
    
        return {
            handleChange,
            selectItem,
            values,
            results,
            searchRef,
            addTags,
            selectTag,
            clearInput,
            removeTag,
            handleKeyDown
        }
}