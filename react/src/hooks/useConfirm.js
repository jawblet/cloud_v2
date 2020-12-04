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
        const registerUser = (values, house) => {
            const { username, email, password, passwordConfirm } = values;
                 axios.post('auth/register', { //create user
                      username,
                      email,
                      password,
                      passwordConfirm,
                      house: house._id
                    }).then(res => {
                        const user = res.data.data.user; // get new user
                        const newUnconfirmed = house.boardersUnconfirmed.filter(el => el !== values.email);
                        const newConfirmed = [...house.boarders, user._id];
                        return axios.put(`houses/${house._id}`, {
                            boardersUnconfirmed: newUnconfirmed, // remove from boarders unconfirmed
                            boarders: newConfirmed              // add to boarders confirmed
                            })
                        }).then(() => {
                            return axios.get('/user').then(res => { // check user's jwt 
                            console.log(res.data.currentUser);
                            setUser(res.data.currentUser);          // use jwt value to set current user
                            history.push('/home');                  // push user home
                        });
                    }).catch((err) => {
                     console.log(err);
                     setError(err.response.data);
                })
          };

    return {
        values,
        handleChange,
        error,
        handleCheckUser
    }
}