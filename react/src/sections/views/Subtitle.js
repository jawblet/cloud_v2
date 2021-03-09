import React from 'react';
import { Link } from 'react-router-dom';

const Subtitle = (props) => {
    return (
        <Link to={props.slug}>
            <h4 className={`subtitle ${props.heavy ? 'heavy' : ''}`} style={{paddingBottom:props.p}}>
                {props.label}
            </h4>
        </Link>
    );
}
 
export default Subtitle;