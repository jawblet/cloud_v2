import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import CreateUser from './CreateUser';
import CreateHouse from './CreateHouse';
 
export default function Register(props) {
    const [createUser, setRegistration] = useState(true);
    const [active, setActive] = useState('register');

    useEffect(() => {
        if(props.location.hash === '#rent') {
            setRegistration(false);
            setActive('rent')
        }
    }, [props]);

    return(
        <div className="page" >
            <div style={{width: '35%', marginTop:'3rem', paddingBottom:'5rem',}}>
                <Breadcrumbs crumbs={['register', 'rent']} active={active}/>
            </div>
            {createUser 
                ? <CreateUser />
                : <CreateHouse />
            }
        </div>
    )
}