import React from 'react';
import { Link } from 'react-router-dom';
import Header from './../sections/Header';

export default function Home() {

    return(
        <div className="page">
            <Header/>
            This page is home. <br/>
            The content here is protected for logged in users :) <br/>
            <Link to ="/add">
                Add something.
            </Link>
        </div>
    )
};