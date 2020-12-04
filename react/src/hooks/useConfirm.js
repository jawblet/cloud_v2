import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';  

export default function useConfirm({ initialValues }) {
    let history = useHistory();
    const { user, setUser } = useContext(UserContext);
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
        const handleCheckUser = ({ values }) => {
            console.log(values);
            //check if house exists 
            const houseName = values.house; 
            axios.get(`/houses/h/${houseName}`)
                .then(res => {
                    const house = res.data.data.results[0];
                    //check if user email was added to house
                    const isBoarder = house.boardersUnconfirmed.includes(values.email);
                    isBoarder  
                        ? registerUser(values, house)
                        : (setError({
                            messages: 'That email isn\'t associated with a boarder', 
                            fields: 'email'}));
            }).catch(err => {
                console.log(err);
                setError(err.response.data); // 404 // house doesn't exist 
            });
        }

        //register user  
        const registerUser = async (values, house) => {
            const { username, email, password, passwordConfirm } = values;
            try { // create user 
                await axios({
                    method: 'POST',
                    url: `auth/register`, 
                    data: {
                      username,
                      email,
                      password,
                      passwordConfirm,
                      house: house._id
                    }
                }).then(res => {
                        const user = res.data.data.user;
                        //remove user from unconfirmed array and into confirmed on house model 
                        const newUnconfirmed = house.boardersUnconfirmed.filter(el => el !== values.email);
                        const newConfirmed = [...house.boarders, user._id];
                        return axios.put(`houses/${house._id}`, {
                            boardersUnconfirmed: newUnconfirmed,
                            boarders: newConfirmed
                        }).then(res => {
                            setUser(user); //log user in 
                            history.push('/home'); //send them to home 
                        });
                    })
                } catch(err) {
                     console.log(err);
                     setError(err.response.data);
                }
          };

    return {
        values,
        handleChange,
        error,
        handleCheckUser
    }
}