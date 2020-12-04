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
            case 'rent':
            rentHouse({ values });
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
                    const user = res.data.data.user;
                    setUser(user); 
                    history.push('/register#rent'); 
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
                method: 'PUT',
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

// rent house + handle the email chips
    const searchRef = React.createRef(); //define searchRef

 //handle add
    const addTags = () => { 
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.input)) {
            if(values.boardersUnconfirmed.length < 4) {
                setValues({
                    ...values,
                    boardersUnconfirmed: [...values.boardersUnconfirmed, values.input]
                })
                clearInput();
            }
        } else {
           return console.log('not an email'); 
        }
    };

//handle clear
    const clearInput = () => {
        searchRef.current.value = "";
    }

//handle delete boarder 
const removeTag = (tag) => {
    let newBoarders = values.boardersUnconfirmed.filter(el => el !== tag);
    setValues({
        ...values,
        boardersUnconfirmed: newBoarders
    });
 };
 
//submit + rent house 
const rentHouse = (formValues) => {
    const { house, boardersUnconfirmed } = formValues.values;
    try {
         axios({
            method: 'POST',
            url: `houses`,
            data: {
              house,
              boardersUnconfirmed, // save new emails as unconfirmed users
              boarders: user._id //save creator as confirmed user
            }
        }).then(res => {
            const house = res.data.data.doc._id;
            return axios ({
                method: 'PUT',
                url: `users/${user._id}`,
                data: {
                    house
                }
            }).then(res => {
                 const updatedUser = res.data.data.doc;
                 setUser(updatedUser);
                 history.push('/home');
            })
        })
        } catch(err) {
        setError(err.response.data);
        console.log(err);
    }
}
    return {
        handleChange,
        handleSubmit,
        values,
        error,
        success,
        searchRef,
        addTags,
        clearInput,
        removeTag
    }
}