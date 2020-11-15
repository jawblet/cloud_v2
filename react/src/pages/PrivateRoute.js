import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from './../hooks/UserContext';

export default function PrivateRoute(props) {
    const { user } = useContext(UserContext);

    const checkAuthentication = () => {
            console.log('Private route');
            console.log(user);
            console.log(props.component);
            const Component = props.component; 
            if(user) {
                return <Component/>
            } else {
                return <Redirect to={{ pathname: '/' }} />
            }
        }
 
    return(
        <>
        {checkAuthentication(props)}
       </>
    )
};

