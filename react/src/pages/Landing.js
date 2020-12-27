import React from 'react';
import { Link } from 'react-router-dom';
import InlineButton from '../components/btns/InlineButton';
import { BlobS1, BlobS2, BlobS3, BlobM1, BlobM2, BlobL1, MountainModel } from '../svg/BlobGarden';

export default function Landing() {
    const line = '#72716B';
    const w = '30%';
    
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
           <section className="landing__body"> 
                <svg width={w} viewBox="0 0 800 800" stroke-width="4" fill="transparent" stroke={line}>
                    <BlobL1/>
                    <BlobM2/>
                    <BlobM1/>
                    <BlobS2/>
                    <BlobS1/>
                </svg>
           </section>
        </div>
    )
}

//<span className="landing__pin"></span>