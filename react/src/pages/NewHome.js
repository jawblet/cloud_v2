import React, { useState } from 'react';
import Header from '../sections/Header';
import ExpandButton from '../atoms/ExpandButton';
import NavBar from '../components/btns/NavBar';
import { navButtons } from '../data/buttons';
import BlobCanvas from '../sections/BlobCanvas';

export default function Home() {
    const [squeeze, setSqueeze] = useState(true);
    const handleExpandClick = () => { setSqueeze(!squeeze); }
    
    const squeezeBtn = [
        {id: 4,
        name: 'squeeze', 
        type: 'bottom', 
        icon: <ExpandButton className="icon icon__btn" squeeze={squeeze} data-id="squeeze"/> }
    ];

    return (
        <div className="page">  
            <Header/> 
            <div className="skylight">
                    <BlobCanvas/>
            </div>
                <div className="skylight__nav">
                    <NavBar buttons={navButtons} 
                            squeezeBtn={squeezeBtn} 
                            direction="column"
                            handleExpandClick={handleExpandClick} 
                            squeeze={squeeze} />
                </div>
        </div>
    )
}; 