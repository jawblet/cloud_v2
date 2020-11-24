import React, { useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';  

export default function useForm({ initialValues }) {
    let history = useHistory();
    const { user, setUser } = useContext(UserContext);
    const [values, setValues] = useState(initialValues || {});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    //track form values
    const handleChange = event => {
        const value = event.target.value; 
        const name = event.target.name;
        setValues({
            ...values,
            [name]: value
        }); 
    };

    //submit form when submit button is clicked 
    const handleSubmit = event => {
        event.preventDefault();
        switch (values.form) {
            case 'register':
            registerUser({ values });
            break;
            case 'login':
            loginUser({ values });
            break;
            case 'user':
            updateUser({ values });
            if(values.password || values.passwordConfirm) {
                updatePassword({ values });
            }
            break;
            default: 
            console.log('no form found');
        }
    };

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
                    console.log(res);
                    const user = res.data.data.user;
                    setUser(user); 
                    history.push('/home'); 
                })
            } catch(err) {
                 console.log(err);
                 setError(err.response.data);
            }
      };

    //login user 
    const loginUser = async (formValues) => {
 
        const { username, password } = formValues.values;
        try {
            await axios({
                method: 'POST',
                url: `auth/login`, 
                data: {
                  username,
                  password,
                }
            }).then(res => { 
                    console.log(res.data.data.user.username);
                    const user = res.data.data.user;
                    setUser(user); 
                    history.push('/home'); 
                })
            } catch(err) {
                 console.log(err);
                 setError(err.response.data);
            }
      };
 
//update user information
      const updateUser = async (formValues) => {
          const { username, email } = formValues.values;
          setSuccess(null);
          setError(null);
          try {
              await axios({
                  method: 'PUT',
                  url: `users/${user._id}`,
                  data: {
                    username,
                    email
                  }
              }).then(res => {
                  console.log(res);
                  setSuccess('Profile update complete.');
              })
          } catch(err) {
              console.log(err);
              setError(err.response.data);
          }
      }

      const updatePassword = async (formValues) => {
        const { password, passwordConfirm } = formValues.values;
        setSuccess(null);
        setError(null);
        try {
            await axios({
                method: 'PATCH',
                url: `auth/password/${user._id}`,
                data: {
                  password,
                  passwordConfirm
                }
            }).then(res => {
                console.log(res);
                setSuccess('Profile update complete.'); })
        } catch(err) {
            console.log(err);
            setError(err.response.data);
        }
    }

//create house
    const searchRef = React.createRef();

//clear search
    const clearInput = () => {
        searchRef.current.value = " ";
    }

//remove boarder 
const removeTag = (tag) => {
    let newBoarders = values.boarders.filter(el => el !== tag);
    setValues(prevValues => ( {
        ...prevValues,
        boarders: newBoarders
    }));
 };

const addEmails = () => {
        //let boarders = values.boarders;
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.emailInput)) {
            if(values.boarders.length < 4) {
                values.boarders.push(values.emailInput);
                clearInput();
            }
        } else {
           return console.log('not an email'); 
        }
}

    return {
        addEmails,
        handleChange,
        handleSubmit,
        values,
        error,
        success,
        searchRef,
        clearInput,
        removeTag
    }
}