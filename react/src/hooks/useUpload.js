import React, { useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';
import axios from 'axios'; 
import { UserContext } from './UserContext';
import { colors } from './colors'; 
 
export default function useUpload({ initialValues }) {
    let history = useHistory();
    const colorArr = colors;
    const { user } = useContext(UserContext); 
    const [values, setValues] = useState(initialValues || {}); 
    const [results, setResults] = useState([]);
    const [tagIds, setTagIds] = useState([]);

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

        if(searchRef.current) {
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

//handle room selection 
    const selectItem = e => {
        setValues({
            ...values,
            room: e.currentTarget.dataset.id
        }); 
    }

//add tags to state and post them 
    const addTags = async () => {
        if(values.input) {
            setValues({
                ...values,
                tags: [...values.tags, values.input],
                input: ''
            }); 
            
            //post tag 
            const n = Math.floor(Math.random() * Math.floor(colorArr.length));
            let color = colorArr[n];
            try {
                await axios({
                    method: 'POST',
                    url: 'tags',
                    data: {
                        tag: values.input,
                        house: user.house,
                        user: user._id,
                        color
                    }
                }).then(res => {
                    const newId = res.data.data.tag._id;
                    setTagIds([...tagIds, newId]);
                })
            } catch(err) {
                console.log(err);
            }
        } else {
            return console.log('not a tag');
        }
    };

//select existing tag from autocomplete
    const selectTag = (e) => {
        console.log(e.currentTarget.dataset.id);
        console.log(e.currentTarget.dataset.name);

        const tagId = e.currentTarget.dataset.id;
        const tagName = e.currentTarget.dataset.name;
        
        //add tag name to tags 
        setValues({
            ...values,
            tags: [...values.tags, tagName],
            input: ''
        });

        //add tag id to tags
        setTagIds([...tagIds, tagId]);
    }

    //clear input
    const clearInput = () => {
       // searchRef.current.value = ""; 
       setValues({
        ...values,
        input: ''
    });
    }

    const removeTag = (tag) => {
        let newTags = values.tags.filter(el => el !== tag);
        setValues({
            ...values,
            tags: newTags
        });
     };
    
//handle submit 
    const handleSubmit = e => {
        e.preventDefault();
        postLink( {values} );
    }

//handle URL POST 
    const postLink = async (formValues) => {
        const { type, content, user, house, room } = formValues.values;
            try {
                await axios({
                    method: 'POST',
                    url: 'posts',
                    data: {
                        type,
                        content,
                        user,
                        house, 
                        room,
                        tags: tagIds
                    }
                }).then(res => {
                    console.log(res);
                    history.push(`home/${room}`); 
                })
                } catch(err) {
                    console.log(err)
                }
        };

        return {
            handleChange,
            handleSubmit,
            selectItem,
            values,
            results,
            searchRef,
            addTags,
            selectTag,
            clearInput,
            removeTag
        }
}