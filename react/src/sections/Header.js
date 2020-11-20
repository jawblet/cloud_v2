import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import InlineButton from './../components/InlineButton';
import { UserContext } from '../hooks/UserContext';
import useLogout from './../hooks/useLogout';

export default function Header() {
    const { user } = useContext(UserContext);
    const { logoutUser } = useLogout(); 

    return(
        <header className='page__header'>
            <div className='page__links'>
             <Link to="/home">
                <InlineButton name='skylight'/>
            </Link>
            <Link to="/user">
                <InlineButton name={`@${user.username}`}/>
            </Link>
            </div>
            <InlineButton name={'logout'} handleClick={logoutUser} />
        </header>
    )
}