import React from 'react';
import { Link } from 'react-router-dom';
import InlineButton from './../components/InlineButton';
//import Notification from './../components/Notification'; 

export default function Landing() {
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