import React, { useState } from 'react';
import Header from './../sections/Header';
import Cards from '../sections/Cards'; 
import Button from './../components/Button';
import ExpandButton from './../atoms/ExpandButton';

export default function Home() {
    const [squeeze, setSqueeze] = useState(true);
    
    const handleExpandClick = () => {
        setSqueeze(!squeeze);
    }

    return(
        <div className="page">
            <Header/>
            <Cards squeeze={squeeze}/>

            <span className="fixedBtn">
                <Button handleClick={handleExpandClick}
                button={<ExpandButton squeeze={squeeze}/>}/>
            </span>

        </div>
    )
};