import { useState, useContext } from 'react'; 
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
        const dataObject = formValues.values; 
        const { username, email, password, passwordConfirm } = dataObject;
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
        const dataObject = formValues.values; 
        const { username, password } = dataObject;
        try {
            await axios({
                method: 'POST',
                url: `auth/login`, 
                data: {
                  username,
                  password,
                }
            }).then(res => {
                    console.log(res);
                    const username = res.data.data.user.username;
                    setUser(username); 
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
          //console.log('update user');
          //remove notification on submit  
          setSuccess(null);
          setError(null);
          try {
              await axios({
                  method: 'PATCH',
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
        //console.log('update pass');
        const { password, passwordConfirm } = formValues.values;
        //remove notification on submit  
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
                setSuccess('Profile update complete.');            })
        } catch(err) {
            console.log(err);
            setError(err.response.data);
        }
    }

    return {
        handleChange,
        handleSubmit,
        values,
        error,
        success
    }
}