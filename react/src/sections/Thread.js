import React from 'react';
import CTA from '../components/btns/CTA';

const Thread = (props) => {
    return (
    <div className="thread">
    <div className="thread__OG">
        <p>Subject</p>
        <div className="thread__metadata">
           <h4 className="thread__author">Jawblia</h4>
           <h4 className="thread__date">dec 28 2020</h4>
        </div>
    </div> 
    <CTA name="reply"/> 
    </div>
    );
}
 
export default Thread;