import React, { useState } from 'react';
import Row from '../atoms/Node';
import { ROWS } from '../data/syllabus'; 
import SyllabusHeading from '../sections/SyllabusHeading';

const Syllabus = () => {
    const c = ROWS.map(el => el.components);
    const [open, setOpen] = useState(c.flat().map(el => false));

    const handleOpen = (i) => {
        const arr = [...open];
        arr[i] = !arr[i];
        setOpen(arr); 
    } 

    return (
        <>
            <div className="syllabus">
                {ROWS.map((row, i) => {
                    return ( 
                        <Row key={i}
                            row={row} open={open}
                            handleOpen={handleOpen}
                        /> 
                    )
                })}
            </div>
        </>
    ); 
}
 
export default Syllabus;

/*
<Grid columns='repeat(3, 1fr)' gap={3} className="syllabus">
            {SYLLABUS_HEADERS.map((item, i) => {
                return <SyllabusColumn key={i}
                        item={item}  id={i}
                        />
            })}
        </Grid>
 <SteppedLineTo from="wark" to="malloy" 
        fromAnchor="center right"
        toAnchor="center left"
        orientation="h"
        delay />
*/

 