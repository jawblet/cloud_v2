import React, { useContext, useEffect } from 'react';
import InlineButton from './../components/InlineButton';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';

export default function Header() {
    let history = useHistory();
    const { user } = useContext(UserContext);

    return(
        <header className='page__header'>
            Hello, {user}.
            <InlineButton name={'logout'}/>
        </header>
    )
}