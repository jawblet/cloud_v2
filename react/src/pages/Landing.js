import React from 'react'; 
import { Link } from 'react-router-dom';
import InlineButton from '../components/btns/InlineButton';
import { LANDING_NOTES } from '../data/buttons';
 
export default function Landing() {
    
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
               <h1>
                   <span className="light">return home, </span>
                   arrive anywhere
                </h1>
           </section>
        </div>
    )
}
