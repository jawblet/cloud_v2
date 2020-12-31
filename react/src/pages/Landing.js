import React, { useContext } from 'react'; 
import { Link } from 'react-router-dom';
import InlineButton from '../components/btns/InlineButton';
import { BlobS1, BlobS2, BlobS3, BlobM1, BlobM2, BlobL1, MountainModel } from '../svg/BlobGarden';
import { Grid } from '../svg/Grid';
import Tooltip from '../atoms/Tooltip';
import { LANDING_NOTES } from '../data/buttons';
import { UserContext } from '../hooks/UserContext';
 
export default function Landing() {
    //const line = '#72716B';
   // const line = '#bb956a';
    const line = '#b17954'
    const w = '40%';
    const tooltips = ['A', 'B', 'C'];

    
    return ( 
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
                <div className="landing__grid">
                    <Grid/>
                </div>
                {tooltips.map((tooltip, i) => {
                    return(
                        <div className="tooltipAnchor" id={tooltip} key={i}>   
                            <span className="landing__pin"></span>
                                <Tooltip text={LANDING_NOTES[i]} direction="top" style="white" show={true} dataId={i}/>
                            </div>
                    )})
                }
                <svg width={w} viewBox="0 0 800 800" strokeWidth="4" fill="transparent" stroke={line} 
                    className="landing__map">
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

/*
style={{position:'relative'}}

 <div className="landing__grid">
            <svg width="100%" viewBox="0 0 800 800" stroke-width="4" fill="transparent" stroke={line}>
                <Grid/>
            </svg>
           </div>
*/