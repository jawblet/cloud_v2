import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import InlineButton from '../components/InlineButton';
import { BreadcrumbsNav } from '../components/Breadcrumbs';
import { UserContext } from '../hooks/UserContext';
import useLogout from '../hooks/useLogout';

export default function Header({ nav }) {
    const { user } = useContext(UserContext);
    const { logoutUser } = useLogout(); 


    return(
        <header className='page__header'>
            <div className='page__links'>
                <BreadcrumbsNav nav={nav}/>
            </div>
            <div className="page__links">
            <Link to="/user">
                <InlineButton name={`@${user.username}`}/>
            </Link>
            <InlineButton name={'logout'} handleClick={logoutUser} />
            </div>
        </header>
    )
}