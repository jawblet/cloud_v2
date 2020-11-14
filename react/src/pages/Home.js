import React, { useContext } from 'react';
import { UserContext } from './../hooks/UserContext';

export default function Home() {
    const { user } = useContext(UserContext);

    return(
        <div className="page">
            Successful registration: welcome, {user}. 
        </div>
    )
}