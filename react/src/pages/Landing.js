import React from 'react';
import { Link } from 'react-router-dom';
import InlineButton from './../components/InlineButton';

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
           <h3>This is the public landing page</h3> 
        </div>
    )
}