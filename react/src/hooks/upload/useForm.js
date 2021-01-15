import React, { useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';
import axios from 'axios'; 
import { UserContext } from '../UserContext';  
 
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
            default: return;
        }
    };

    //email boarders
    const emailBoarders = (house, users) => {
        console.log('boarders r emailed');
        axios.post('/houses/email', {
            house,
            users
        }).then(res => console.log(res))
        .catch(err => console.log(err));
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
                    setUser(user); //set user in context w/o jwt 
                    history.push('/register#rent'); 
                })
            } catch(err) {
                 console.log(err);
                 setError(err.response.data);
            }
      };

//submit + rent house 
const rentHouse = (formValues) => {
    const { house, boardersUnconfirmed } = formValues.values;
         axios.post('houses', {
              house,
              boardersUnconfirmed,  // save new emails as unconfirmed users
              boarders: user._id    // save creator as confirmed user
            }).then(res => {
            console.log(boardersUnconfirmed);
            if(boardersUnconfirmed.length !== 0) { 
                emailBoarders(house, boardersUnconfirmed); 
            }
            const houseId = res.data.data.doc._id;
            return axios.put(`users/${user._id}`, { // add house to user 
                house: houseId
                })
            }).then(() => { 
                return axios.get('/user')
                .then(res => {     // check user's jwt             
                    //console.log(res);         
                    setUser(res.data.currentUser);      // use jwt value to set current user
                    history.push('/');                  // push user home
                });  
        }).catch((err) => {
            setError(err.response.data);
            console.log(err);
    })
};

    //login user 
    const loginUser = async (formValues) => {
        const { username, password } = formValues.values;
            await axios.post('auth/login', {
                  username,
                  password
            }).then(async () => { 
                return await axios.get('/user')
                .then(res => {                          // check user's jwt 
                    setUser(res.data.currentUser);      // use jwt value to set current user
                    history.push('/');                  // push user home
                    });  
                }).catch((err) => {
                 console.log(err.response.data);
                 setError(err.response.data);
            })
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
                  //console.log(res);
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
                url: `/auth/password/${user._id}`,
                data: {
                  password,
                  passwordConfirm
                }
            }).then(res => {
                //console.log(res);
                setSuccess('Profile update complete.'); })
        } catch(err) {
            console.log(err);
            setError(err.response.data);
        }
    }

// rent house + handle the email chips
const searchRef = React.createRef(); //define searchRef

//handle key down events in tag upload
const handleKeyDown = (e) => { 
    if(searchRef.current) {
       //submit tags on comma or enter press
        if(e.keyCode === 188 || e.keyCode === 13) {
            e.preventDefault();
            addTags();
        }
    }
};

 //handle add
    const addTags = () => { 
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.input)) {
            if(values.boardersUnconfirmed.length < 4) {
                    if(values.boardersUnconfirmed.includes(values.input)) { // don't add existing emails
                        return setError({messages: 'That email address was already added.', fields: ['email']})
                    }

                const trimmedTag = values.input.trim(); //trim whitespace 
                setValues({
                    ...values,
                    boardersUnconfirmed: [...values.boardersUnconfirmed, trimmedTag]
                })
                setError(null);
                clearInput();
            }
        } else {
           return setError({messages: 'Email address is not valid.', fields: ['email']});
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
 
    return {
        handleChange,
        handleSubmit,
        values,
        error,
        success,
        searchRef,
        addTags,
        clearInput,
        removeTag,
        handleKeyDown
    }
}