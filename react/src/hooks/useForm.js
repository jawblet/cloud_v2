import { useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';

export default function useForm({ initialValues }) {
    let history = useHistory();
    const { setUser } = useContext(UserContext);
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

    //submit form when enter key is pressed 
    const handleKeyDown = event => { 
        const enter = 13;
        if(event.keyCode === enter) {
            console.log('enter key was pressed');
            handleSubmit(event);
        }
    }

    //submit form when submit button is clicked 
    const handleSubmit = event => {
        event.preventDefault();
        console.log('submit btn clicked');
        submitData({ values });
    };

    //send data to database 
    const submitData = async (formValues) => {
        const dataObject = formValues.values; 
        const { username, email, password, passwordConfirm } = dataObject;
        try {
            await axios({
                method: 'POST',
                url: `auth/register`,
                data: {
                  username: username,
                  email: email,
                  password: password,
                  passwordConfirm: passwordConfirm
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

    return {
        handleChange,
        handleKeyDown,
        values,
        handleSubmit, 
        error
    }
}