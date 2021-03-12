import React from 'react';
import { Link } from 'react-router-dom'; 

const HouseNav = ({ hover }) => { 
    return (
    <div className="houseNav"> 
        <div className="houseNav__A"> 
            <Link to="/library/paths" className={`A A1 ${hover === 1 ? 'hover' : '' }`}>
                    1
            </Link>
            <Link to="/library/rooms" className={`A A2 ${hover === 2 ? 'hover' : '' }`}>
                    2
            </Link>
        </div>

        <div className="houseNav__B"> 
            <Link to="/library/syllabus" className={`B B1 ${hover === 3 ? 'hover' : '' }`}> 
                3
            </Link>
            <div className="B2">
                <div className="B2--top">
                <Link to="/" className={`B B2--4 ${hover === 4 ? 'hover' : '' }`}> 
                        4
                    </Link>
                <Link to="/" className={`B B2--5 ${hover === 5 ? 'hover' : '' }`}> 
                       5
                    </Link>
                </div>
                    <Link to="/library/archive" className={`B B2--6 ${hover === 6 ? 'hover' : '' }`}> 
                       6
                    </Link>
            </div>
            <Link to="/library/inbox" className={`B B3 ${hover === 7 ? 'hover' : '' }`}> 
                        7
            </Link>
        </div>
    </div>
    );
}
 
export default HouseNav;
                     