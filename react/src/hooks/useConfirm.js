import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function useConfirm({ initialValues }) {
    let history = useHistory();

    const [values, setValues] = useState(initialValues || {});
    const [error, setError] = useState(null);

        //track form values
        const handleChange = event => {
            const value = event.target.value; 
            const name = event.target.name;
            setValues({
                ...values, 
                [name]: value
            }); 
        };
        
        //check user
        //remove user from unconfirmed boarders and to confirmed 
        //register user  
        const registerUser = async (formValues) => {
            const { username, email, password, passwordConfirm } = formValues.values;
            try {
                await axios({
                    method: 'POST',
                    url: `auth/register`, 
                    data: {
                      username,
                      email,
                      password,
                      passwordConfirm
                    }
                }).then(res => {
                        const user = res.data.data.user;
                    })
                } catch(err) {
                     console.log(err);
                    // setError(err.response.data);
                }
          };

    return {
        values,
        handleChange,
        error
    }
}