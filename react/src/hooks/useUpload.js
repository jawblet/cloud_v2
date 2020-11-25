import { useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function useUpload({ initialValues }) {
    const [values, setValues] = useState(initialValues || {}); 

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
            console.log(e.currentTarget.dataset.id);
            setValues({
                ...values,
                room: e.currentTarget.dataset.id
            }); 
        }

        const handleSubmit = e => {
            e.preventDefault();
            postLink( {values} );
        }

        const postLink = async (formValues) => {
            const { content, author, type } = formValues.values;
            try {
                await axios({
                    method: 'POST',
                    url: 'posts/',
                    data: {
                        type,
                        content,
                        author,
                        //house,
                        //room
                    }
                }).then(res => {
                    console.log(res);
                })
                } catch(err) {
                    console.log(err)
                }
        };

        return {
            handleChange,
            handleSubmit,
            selectItem,
            values
        }
}