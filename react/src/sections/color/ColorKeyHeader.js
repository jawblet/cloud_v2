import React from 'react';
import { COLOR_HEADINGS } from './key';

const ColorKeyHeader = () => {
    return (
        <thead className="fullWidth">
        <tr className="key__row"> 
        {COLOR_HEADINGS.map((label, i) => {
             return <th key={i} className="key__cell heavy">
                 {label}
                 </th> })}
            </tr>
        </thead>
    );
}
 
export default ColorKeyHeader;