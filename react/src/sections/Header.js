import React, { useContext } from 'react';
import InlineButton from './../components/InlineButton';
import { UserContext } from '../hooks/UserContext';
import useLogout from './../hooks/useLogout';

export default function Header() {
    const { user } = useContext(UserContext);
    const { logoutUser } = useLogout(); 

    return(
        <header className='page__header'>
            Hello, {user}.
            <InlineButton name={'logout'} handleClick={logoutUser} />
        </header>
    )
}