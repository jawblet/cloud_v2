import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Header from './../sections/Header';
import Cards from '../sections/Cards'; 
import Button from './../components/Button';
import ExpandButton from './../atoms/ExpandButton';
import Room from './Room';

export default function Home() {
    const [squeeze, setSqueeze] = useState(true);
    
    const handleExpandClick = () => {
        setSqueeze(!squeeze);
    }

    return (
        <div className="page">
            <Header/> 
            <Cards squeeze={squeeze}/>
            <span className="fixedBtn">
                <Button handleClick={handleExpandClick}
                button={<ExpandButton squeeze={squeeze}/>}/>
            </span>
            <Route path='/home/:room' component={Room} />
        </div>
    )
};