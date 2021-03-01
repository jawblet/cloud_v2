import React from 'react';
import Card from '../../components/Card';

const Versioning = ({ versions }) => {
    //sort most to least recent 
    return (
    <div className="versions">
        <h4 className="heavy" style={{paddingBottom:'0.5rem'}}>All versions</h4>
        {versions.map((v, i) => {
            return <Card key={i}
                    card={v}
                    version={true}/>
        })}
    </div>
    );
}
 
export default Versioning;