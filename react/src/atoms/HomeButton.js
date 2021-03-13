import React from 'react';
import Button from '../components/btns/Button';
import { Link } from 'react-router-dom';
import { VscHome } from 'react-icons/vsc';

const HomeButton = () => {
    return (
    <Link to="/" className="homeButton">
        <Button icon={<VscHome className="icon icon__btn" data-id="house"/>}/>
    </Link>
   );
}
 
export default HomeButton;