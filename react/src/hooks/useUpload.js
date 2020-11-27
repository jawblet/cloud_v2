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
    const [tagIds, setTagIds] = useState([]);
 
//track form values
    const handleChange = event => {
        const value = event.target.value; 
        const name = event.target.name;
            setValues({
                ...values,
                [name]: value
            }); 
    };

//handle room selection 
    const selectItem = e => {
        setValues({
            ...values,
            room: e.currentTarget.dataset.id
        }); 
    }

//handle tag selection
    const searchRef = React.createRef(); //define searchRef 

//add tags to state and post them 
    const addTags = async () => {
        if(values.input) {
            setValues({
                ...values,
                tags: [...values.tags, values.input]
            })
            clearInput();
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

    const clearInput = () => {
        searchRef.current.value = "";
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
        const { type, content, user, username, house, room } = formValues.values;
            try {
                await axios({
                    method: 'POST',
                    url: 'posts',
                    data: {
                        type,
                        content,
                        user,
                        username,
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
            searchRef,
            addTags,
            clearInput,
            removeTag
        }
}