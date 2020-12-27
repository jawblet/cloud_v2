import React from 'react';
import { Link } from 'react-router-dom';

const HomeIcon = () => { 
    return (
        <Link to='/house'>
                <div className="homeIcon__house">
                    <div className="homeIcon__label"> 
                        <span className="homeIcon__pin"></span>
                        <h4>house</h4>
                    </div>
                </div>
        </Link>
    );
}
 
export default HomeIcon;