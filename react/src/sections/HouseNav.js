import React from 'react';
import { Link } from 'react-router-dom'; 

const HouseNav = ({ hover }) => {
    return (
    <div className="houseNav">
        <div className="houseNav__A"> 
            <Link to="/house/zone"
                className={`A1 ${hover === 1 ? 'hoverRoom' : ''}`}
                >
                    <h6>1</h6>
            </Link>
            <Link to="/house/key" 
                className={`A2 ${hover === 2 ? 'hoverA2' : ''}`}
                >
                    <h6>2</h6>
            </Link>
        </div>
        <div className="houseNav__B"> 
            <Link to="/house/paths" 
                className={`B1 ${hover === 3 ? 'hoverB1' : ''}`}
                 > 
                <h6>3</h6>
            </Link>
            <div className="B2">
                    <Link to="/" 
                        className={`B2A ${hover === 4 ? 'hoverB2A' : ''}`}
                        > 
                        <h6>4</h6>
                    </Link>
                    <Link to="/" 
                        className={`B2B ${hover === 5 ? 'hoverB2B' : ''}`}
                        > 
                        <h6>5</h6>
                    </Link>
                    <Link to="/" 
                        className={`B2B ${hover === 6 ? 'hoverB2B' : ''}`}
                        > 
                        <h6>6</h6>
                    </Link>
            </div>
            <Link to="/" 
                className={`B3 ${hover === 7 ? 'hoverB3' : ''}`}
                > 
                <h6>7</h6>
            </Link>
        </div>
        <Link to="/" 
            className={`houseNav__C ${hover === 8 ? 'hoverRoom' : ''}`}
            > 
            <h6>8</h6>
        </Link>
    </div>
    );
}
 
export default HouseNav;