import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext'; 

export default function useConfirm({ initialValues }) {
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
        
        //check if house exists
        const handleCheckHouse = ({ values }) => {
            //check if fields are blank 
            const blankValues = Object.entries(values).forEach(([k, v]) => 
               { if(v === "") {
                    return k } 
            });
           if(blankValues && blankValues.length !== 0) {
                setError({
                    messages: 'No field may be blank.',
                    fields: blankValues
                })
                 return null;
           };    

            const houseName = values.house; 
            axios.get(`/houses/h/${houseName}`) // search house by name! 
                .then(res => {
                    console.log(res);
                    const house = res.data.data.results[0];
                    handleCheckUser(values, house); //step #2        
            }).catch(err => {
                console.log(err);
               // setError(err.response.data);
            });
        };

        //if house exists, check if user is a part of house 
        const handleCheckUser = (values, house) => {
            const isBoarder = house.boardersUnconfirmed.includes(values.email);
            if (isBoarder) {
                registerUser(values, house)
            } else {
                (setError({
                    messages: 'That email isn\'t associated with a boarder in this house.', 
                    fields: ['email']})); 
                    return null; 
            }
        }; 
      
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
                        console.log(res);
                        const user = res.data.data.user;            // get new user
                        const newUnconfirmed = house.boardersUnconfirmed.filter(el => el !== values.email);
                        const newConfirmed = [...house.boarders, user._id];
                        return axios.put(`houses/${house._id}`, {
                            boardersUnconfirmed: newUnconfirmed, // remove from boarders unconfirmed
                            boarders: newConfirmed              // add to boarders confirmed
                            })
                        }).then( async () => {
                            return await axios.get('/user')
                            .then(res => {                          // check user's jwt 
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
        handleCheckHouse
    }
}


          