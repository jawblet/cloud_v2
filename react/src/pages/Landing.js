import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import InlineButton from '../components/btns/InlineButton';
import { UserContext } from '../hooks/UserContext'

export default function Landing() {
    const history = useHistory();
    const { user } = useContext(UserContext);
    
    //if user is logged in, send them directly to home 
    // if(user && user._id) {
    //   history.push('/home');
    // }

    return(
        <div className="page">
        <header className="landing__header">
                <Link to = "/login"> 
                    <InlineButton name={"login"}/>
                </Link>
                <Link to = "/register"> 
                    <InlineButton name={"register"}/>
                </Link>
            </header>
           <h3>Hi Gr0tch</h3> <br/>
           <h3>Register to this site pls</h3>
        </div>
    )
}