import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';  

export default function useForm({ data }) {
    console.log(data);
    const formValues = data;
    let history = useHistory();
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

    const handleKeyDown = event => { 
        const enter = 13;
        if(event.keyCode === enter) {
            console.log('enter key was pressed');
            handleSubmit(event);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit btn clicked');
        submitData({ formValues });
    };

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
          handleSubmit,
          handleKeyDown,
          error
      }

}
