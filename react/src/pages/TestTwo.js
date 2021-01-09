import React from 'react';
import { Blob1, Blob2 } from '../assets/map/Contour1';
import {BlobFilter, OutlineFilter} from '../svg/SVGFilter';

const TestTwo = () => {

    const outline = {
        filter: `url(#outline)` 
    }


    return (
        <div className="blobGarden">
            <h3 style={{paddingBottom:'1.5rem'}}>Blob library</h3>
            <BlobFilter/>
            <OutlineFilter/>
        <h4 style={{paddingBottom:'1.5rem'}}>blob children</h4>
            <div className="blobGarden__row" style={{marginBottom:'3rem'}}>
                <div className="contour1"
                style={outline}>
                    <Blob1/>
                </div>
            </div>
            <div className="blobGarden__row">
                <div style={outline}>
                    <Blob2/>
                </div>
            </div>
        </div>
    );
}
 
export default TestTwo;